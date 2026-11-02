import SectionHead from "../ui/SectionHead";

const PROBLEMS = [
  [
    "01",
    "Enquadramento",
    "Nem sempre o usuário sabe se a cena está bem posicionada."
  ],
  [
    "02",
    "Foco e luz",
    "Uma foto pode parecer boa e ainda estar desfocada ou mal exposta."
  ],
  [
    "03",
    "Decisão",
    "O usuário precisa descobrir rapidamente se vale a pena recapturar."
  ]
];

export default function Problem() {
  return (
    <section className="border-b border-line py-16">
      <div className="wrap">
        <SectionHead
          eyebrow="Problema"
          title="Fotografar não deveria depender de tentativa e erro."
        >
          O SnapFlow transforma sinais técnicos da câmera em orientações
          simples antes e depois do clique.
        </SectionHead>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PROBLEMS.map(([number, title, text]) => (
            <article
              key={number}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <span className="font-mono text-xs text-lime">{number}</span>

              <h3 className="mb-2 mt-8 text-xl font-semibold">{title}</h3>

              <p className="text-sm leading-relaxed text-muted">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}