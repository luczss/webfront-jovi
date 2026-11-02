import { useCallback, useEffect, useRef, useState } from "react";

function describeError(error) {
  switch (error?.name) {
    case "NotAllowedError":
      return "Permissão negada. Libere o acesso à câmera nas configurações do navegador.";
    case "NotFoundError":
      return "Nenhuma câmera foi encontrada neste dispositivo.";
    case "NotReadableError":
      return "A câmera está sendo usada por outro aplicativo.";
    default:
      return "Não foi possível acessar a câmera.";
  }
}

/** Encapsula o ciclo de vida do stream da câmera (getUserMedia). */
export function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [active, setActive] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setActive(false);
  }, []);

  const start = useCallback(async () => {
    setError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setError(
        "Este navegador não permite acessar a câmera (use HTTPS ou localhost)."
      );
      return;
    }

    setStarting(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;

      await videoRef.current.play().catch(() => {});

      setActive(true);
    } catch (err) {
      setError(describeError(err));
    } finally {
      setStarting(false);
    }
  }, []);

  useEffect(
    () => () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    },
    []
  );

  return { videoRef, active, starting, error, start, stop };
}