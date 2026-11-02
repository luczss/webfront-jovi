import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Meter from "../ui/Meter";

/**
 * Visor da câmera. O <video> fica sempre montado para receber o stream;
 * os indicadores só aparecem com a câmera ligada.
 */
export default function Viewfinder({
  videoRef,
  active,
  starting,
  aiEnabled,
  correriaOn,
  analysis,
  onStart
}) {
  const live = aiEnabled && analysis;

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line bg-black sm:aspect-video">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-full w-full -scale-x-100 object-cover"
      />

      {!active && (
        <div className="absolute inset-0 grid place-items-center bg-black/80 p-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <Icon name="camera" className="h-10 w-10 text-lime" />

            <p className="text-muted">Câmera desligada.</p>

            <Button onClick={onStart} disabled={starting}>
              {starting ? "Abrindo câmera…" : "Ativar câmera"}
            </Button>
          </div>
        </div>
      )}

      {active && (
        <>
          {/* Grade da regra dos terços */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="absolute inset-y-0 left-1/3 w-px bg-white/25" />
            <div className="absolute inset-y-0 left-2/3 w-px bg-white/25" />
            <div className="absolute inset-x-0 top-1/3 h-px bg-white/25" />
            <div className="absolute inset-x-0 top-2/3 h-px bg-white/25" />
          </div>

          <div className="absolute left-3 right-3 top-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
            <span className="rounded-full border border-lime-dim bg-black/70 px-3 py-1 text-lime">
              {aiEnabled
                ? `cena estimada: ${live ? analysis.scene : "analisando…"}`
                : "modo manual"}
            </span>

            {correriaOn && (
              <span className="rounded-full bg-lime px-3 py-1 font-bold text-bg">
                Modo Correria
              </span>
            )}
          </div>

          {aiEnabled && live?.suggestion && (
            <div className="absolute inset-x-3 top-14 mx-auto w-fit max-w-full rounded-full bg-black/75 px-4 py-2 text-center text-sm text-ink">
              {analysis.suggestion}
            </div>
          )}

          <div className="absolute inset-x-3 bottom-3 rounded-xl bg-black/70 p-3 backdrop-blur">
            <div className="flex gap-3">
              <Meter label="Foco" value={live ? analysis.foco : null} />
              <Meter label="Luz" value={live ? analysis.luz : null} />
              <Meter label="Estab." value={live ? analysis.estab : null} />
              <Meter
                label="Comp."
                value={live ? analysis.composicao : null}
              />
            </div>

            <p className="mt-2 font-mono text-[11px] text-muted">
              {aiEnabled
                ? `qualidade geral: ${live ? `${analysis.overall}%` : "--"} · análise a cada 500 ms`
                : "sugestões desligadas: ajustes automáticos suspensos"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}