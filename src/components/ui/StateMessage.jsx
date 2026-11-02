import Spinner from "./Spinner";

const TONES = {
  loading: "border-line text-muted",
  empty: "border-dashed border-line text-muted",
  error: "border-ember/60 text-ember"
};

/**
 * Mensagem de estado: carregando, vazio ou erro.
 * `action` recebe um botão opcional (ex.: "Tentar novamente").
 */
export default function StateMessage({
  kind = "empty",
  title,
  children,
  action
}) {
  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={`flex flex-col items-center gap-3 rounded-2xl border px-6 py-10 text-center ${TONES[kind]}`}
    >
      {kind === "loading" && <Spinner className="h-6 w-6" />}

      {title && (
        <p className="font-display text-lg font-semibold text-ink">
          {title}
        </p>
      )}

      {children && <p className="max-w-md text-sm">{children}</p>}

      {action}
    </div>
  );
}