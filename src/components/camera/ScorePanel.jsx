import Button from "../ui/Button";

function Score({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-surface-2 p-4">
      <strong className="block font-mono text-2xl text-lime">
        {typeof value === "number" ? value : "--"}
      </strong>

      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}

/** Resultado da última captura, com ações salvar / recapturar / descartar. */
export default function ScorePanel({
  capture,
  onSave,
  onRetake,
  onDiscard
}) {
  const analyzed = typeof capture.overall === "number";

  return (
    <section
      aria-labelledby="score-title"
      className="rounded-2xl border border-line bg-surface p-5"
    >
      <h2 id="score-title" className="text-xl font-semibold">
        Resultado da captura
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-[200px_1fr]">
        <img
          src={capture.src}
          alt="Foto capturada"
          className="w-full rounded-xl border border-line object-cover"
        />

        <div>
          <p className="text-sm text-muted">
            {analyzed
              ? `Cena estimada: ${capture.scene} · calculado no navegador após a captura`
              : "Sem análise: as sugestões estavam desligadas."}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Score label="Nitidez" value={capture.sharpness} />
            <Score label="Exposição" value={capture.exposure} />
            <Score label="Composição" value={capture.composition} />
            <Score label="Geral" value={capture.overall} />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={onSave}>Salvar na galeria</Button>

        <Button variant="secondary" onClick={onRetake}>
          Recapturar
        </Button>

        <Button variant="secondary" onClick={onDiscard}>
          Descartar
        </Button>
      </div>
    </section>
  );
}