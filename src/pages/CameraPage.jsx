import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Viewfinder from "../components/camera/Viewfinder";
import ScorePanel from "../components/camera/ScorePanel";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import SectionHead from "../components/ui/SectionHead";
import { useApp } from "../hooks/useApp";
import { useCamera } from "../hooks/useCamera";
import { useFrameAnalysis } from "../hooks/useFrameAnalysis";
import { analyzeStill } from "../utils/imageAnalysis";

// Modo Correria: captura quando a qualidade geral se mantém alta.
// (A especificação da Sprint 2 prevê 95%; com análise por algoritmos
// simples esse valor quase nunca é atingido, então usamos 85%.)
const CORRERIA_THRESHOLD = 85;
const CORRERIA_STREAK = 3; // análises seguidas (≈ 1,5 s)
const CORRERIA_COOLDOWN_MS = 5000;

export default function CameraPage() {
  const { aiEnabled, toggleAI, saveCapture, storageError } = useApp();
  const { videoRef, active, starting, error, start, stop } = useCamera();

  const analysis = useFrameAnalysis({
    videoRef,
    enabled: active && aiEnabled
  });

  const canvasRef = useRef(null);
  const streakRef = useRef(0);
  const lastShotRef = useRef(0);

  const [lastCapture, setLastCapture] = useState(null);
  const [correria, setCorreria] = useState(false);
  const [notice, setNotice] = useState("");

  const correriaOn = correria && aiEnabled && active;

  const takePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video?.videoWidth || !canvas) {
      return null;
    }

    const scale = Math.min(1, 480 / video.videoWidth);

    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);

    canvas
      .getContext("2d")
      .drawImage(video, 0, 0, canvas.width, canvas.height);

    const src = canvas.toDataURL("image/jpeg", 0.72);

    if (!aiEnabled) {
      return {
        src,
        source: "camera",
        scene: "Manual",
        sharpness: null,
        exposure: null,
        composition: null,
        overall: null
      };
    }

    const still = analyzeStill(canvas);

    return {
      src,
      source: "camera",
      ...still,
      scene: analysis?.scene ?? still.scene
    };
  }, [aiEnabled, analysis, videoRef]);

  useEffect(() => {
    if (!correriaOn || !analysis) {
      streakRef.current = 0;
      return;
    }

    streakRef.current =
      analysis.overall >= CORRERIA_THRESHOLD ? streakRef.current + 1 : 0;

    const cooledDown =
      Date.now() - lastShotRef.current > CORRERIA_COOLDOWN_MS;

    if (streakRef.current >= CORRERIA_STREAK && cooledDown) {
      streakRef.current = 0;
      lastShotRef.current = Date.now();

      const shot = takePhoto();

      if (shot) {
        saveCapture(shot);
        setNotice(
          `Modo Correria: foto salva automaticamente (${shot.overall}%).`
        );
      }
    }
  }, [analysis, correriaOn, takePhoto, saveCapture]);

  function capturePhoto() {
    const shot = takePhoto();

    if (shot) {
      setLastCapture(shot);
      setNotice("");
    } else {
      setNotice("Aguarde a câmera iniciar para capturar.");
    }
  }

  function handleSave() {
    saveCapture(lastCapture);
    setLastCapture(null);
    setNotice("Foto salva na galeria.");
  }

  function handleStop() {
    stop();
    setCorreria(false);
  }

  return (
    <section className="wrap py-10 sm:py-14">
      <SectionHead eyebrow="Câmera" title="Teste a câmera SnapFlow.">
        A câmera usa a API do navegador (getUserMedia). Foco, luz,
        estabilidade e composição são calculados com algoritmos de visão
        computacional; a cena é uma estimativa por heurística. Não há
        modelo de IA nem envio de imagens a servidores.
      </SectionHead>

      <Viewfinder
        videoRef={videoRef}
        active={active}
        starting={starting}
        aiEnabled={aiEnabled}
        correriaOn={correriaOn}
        analysis={analysis}
        onStart={start}
      />

      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {active && (
          <Button variant="ghost" onClick={handleStop}>
            Desligar câmera
          </Button>
        )}

        <button
          type="button"
          onClick={capturePhoto}
          disabled={!active}
          aria-label="Capturar foto"
          className="h-16 w-16 rounded-full border-4 border-ink bg-lime transition enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
        />

        <Button variant="secondary" onClick={toggleAI}>
          <Icon name="bolt" className="h-4 w-4" />
          {aiEnabled ? "Desativar sugestões" : "Ativar sugestões"}
        </Button>

        <Button
          variant={correriaOn ? "primary" : "secondary"}
          aria-pressed={correriaOn}
          disabled={!active || !aiEnabled}
          onClick={() => setCorreria((value) => !value)}
        >
          Modo Correria
        </Button>
      </div>

      <div aria-live="polite" className="mt-4 min-h-6 text-center text-sm">
        {error && (
          <p role="alert" className="text-ember">
            {error}
          </p>
        )}

        {storageError && (
          <p role="alert" className="text-ember">
            {storageError}
          </p>
        )}

        {notice && (
          <p className="text-lime">
            {notice}{" "}
            <Link to="/galeria" className="underline">
              Abrir galeria
            </Link>
          </p>
        )}
      </div>

      {lastCapture && (
        <div className="mt-6">
          <ScorePanel
            capture={lastCapture}
            onSave={handleSave}
            onRetake={capturePhoto}
            onDiscard={() => setLastCapture(null)}
          />
        </div>
      )}
    </section>
  );
}