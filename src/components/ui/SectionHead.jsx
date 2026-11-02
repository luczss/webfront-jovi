export default function SectionHead({ eyebrow, title, children }) {
  return (
    <header className="mb-6">
      <p className="eyebrow">{eyebrow}</p>

      <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {children && (
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          {children}
        </p>
      )}
    </header>
  );
}