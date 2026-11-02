export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="wrap grid gap-6 text-sm text-muted sm:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink">
            SnapFlow · FIAP JOVI Challenge 2026
          </p>

          <p className="mt-2 leading-relaxed">
            Protótipo acadêmico em React e Tailwind CSS. A análise de
            imagem roda no navegador com algoritmos de visão
            computacional; não é um modelo de IA.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink">
            Sobre os dados
          </p>

          <p className="mt-2 leading-relaxed">
            Suas fotos ficam apenas no seu navegador (localStorage). As
            referências vêm da API pública Lorem Picsum.
          </p>
        </div>
      </div>
    </footer>
  );
}