import SectionHead from "../ui/SectionHead";

const STEPS = [
  ["01", "Aponte", "Abra a câmera e enquadre a cena."],
  [
    "02",
    "Analise",
    "O app mede foco, luz, estabilidade e composição."
  ],
  [
    "03",
    "Capture",
    "Faça a foto quando os indicadores estiverem bons."
  ],
  ["04", "Organize", "Salve o resultado e acompanhe a qualidade."]
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="wrap">
        <SectionHead
          eyebrow="Como funciona"
          title="Do enquadramento ao resultado."
        />

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([number, title, text]) => (
            <li
              key={number}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <span className="font-mono text-xs text-lime">{number}</span>

              <h3 className="mb-2 mt-6 text-xl font-semibold">{title}</h3>

              <p className="text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}