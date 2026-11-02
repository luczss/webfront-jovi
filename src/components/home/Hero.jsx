import { Link } from "react-router-dom";

import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="border-b border-line py-16 sm:py-24">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="eyebrow">Câmera com feedback · US01–US05</p>

          <h1 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Aponte. A cena, o enquadramento e o foco são lidos por você.
          </h1>

          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            A câmera estima o tipo de cena, sugere enquadramento pela
            regra dos terços e mede nitidez, exposição e estabilidade em
            tempo real. Tudo é calculado no navegador, sem enviar suas
            fotos a nenhum servidor.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/camera">
              Testar a câmera
            </Button>

            <Button as={Link} to="/referencias" variant="secondary">
              Ver referências
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6">
          <span className="font-mono text-xs uppercase tracking-widest text-lime">
            SnapFlow / análise local
          </span>

          <strong className="mt-3 block font-display text-5xl">500 ms</strong>

          <p className="mt-2 text-sm text-muted">
            intervalo entre análises · nenhuma imagem sai do seu
            dispositivo
          </p>
        </div>
      </div>
    </section>
  );
}