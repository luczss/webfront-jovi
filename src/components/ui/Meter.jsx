/** Barra de indicador (0–100). Sem `value`, exibe "--". */
export default function Meter({ label, value }) {
  const hasValue = typeof value === "number";

  return (
    <div className="min-w-0 flex-1">
      <div className="flex justify-between font-mono text-[11px] uppercase text-ink">
        <span>{label}</span>
        <span>{hasValue ? value : "--"}</span>
      </div>

      <div
        className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/15"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={hasValue ? value : undefined}
      >
        <div
          className="h-full rounded-full bg-lime transition-all duration-300"
          style={{ width: `${hasValue ? value : 0}%` }}
        />
      </div>
    </div>
  );
}