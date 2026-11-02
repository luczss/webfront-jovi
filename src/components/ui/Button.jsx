const VARIANTS = {
  primary:
    "border-lime bg-lime font-bold text-bg hover:brightness-110",
  secondary:
    "border-line bg-surface-2 text-ink hover:border-lime-dim",
  ghost: "border-line bg-transparent text-muted hover:text-ink",
  danger: "border-line bg-transparent text-ember hover:border-ember"
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-50";

/**
 * Botão reutilizável. Use `as={Link}` para renderizar um link com o mesmo
 * estilo. Variantes: primary, secondary, ghost e danger.
 */
export default function Button({
  as: Component = "button",
  variant = "primary",
  className = "",
  type,
  ...props
}) {
  return (
    <Component
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      type={Component === "button" ? (type ?? "button") : undefined}
      {...props}
    />
  );
}