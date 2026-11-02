import { useApp } from "../../hooks/useApp";
import SectionHead from "../ui/SectionHead";

const EXAMPLE = [
  ["Foco", "90%"],
  ["Luz", "83%"],
  ["Estab.", "94%"],
  ["Cena", "Retrato"]
];

export default function Perception() {
  const { aiEnabled } = useApp();

  return (
    <section className="border-b border-line py-16">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2">
        <SectionHead
          eyebrow="Percepção"
          title="O que a câmera percebe."
        >
          A camada de percepção traduz a imagem em sinais úteis: foco,
          luz, estabilidade e cena. Os valores ao lado são apenas um
          exemplo ilustrativo; na página Câmera eles são calculados a
          partir do vídeo real.
        </SectionHead>

        <div
          className={`rounded-2xl border bg-surface p-6 transition ${
            aiEnabled ? "border-lime-dim" : "border-line opacity-70"
          }`}
        >
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
            <span
              className={`h-2 w-2 rounded-full ${
                aiEnabled ? "bg-lime" : "bg-muted"
              }`}
            />
            {aiEnabled
              ? "Exemplo ilustrativo"
              : "Sugestões desligadas"}
          </p>

          <dl className="mt-5 grid grid-cols-2 gap-3">
            {EXAMPLE.map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-line bg-surface-2 p-4"
              >
                <dt className="font-mono text-[11px] uppercase text-muted">
                  {label}
                </dt>

                <dd className="mt-1 font-mono text-2xl text-lime">
                  {aiEnabled ? value : "--"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}