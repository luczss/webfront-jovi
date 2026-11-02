import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import SectionHead from "../components/ui/SectionHead";
import Spinner from "../components/ui/Spinner";
import StateMessage from "../components/ui/StateMessage";
import { useApp } from "../hooks/useApp";
import { useAuth } from "../hooks/useAuth";
import { usePhotoReferences } from "../hooks/usePhotoReferences";
import { analyzeImageUrl } from "../utils/imageAnalysis";

export default function ReferencesPage() {
  const { photos, status, error, loadMore, retry } = usePhotoReferences(12);
  const { items, saveCapture } = useApp();
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [analyses, setAnalyses] = useState({});

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    return term
      ? photos.filter((photo) => photo.author.toLowerCase().includes(term))
      : photos;
  }, [photos, query]);

  const savedIds = useMemo(
    () => new Set(items.map((item) => item.refId).filter(Boolean)),
    [items]
  );

  async function handleAnalyze(photo) {
    setAnalyses((current) => ({
      ...current,
      [photo.id]: { status: "loading" }
    }));

    try {
      const result = await analyzeImageUrl(photo.thumb);

      setAnalyses((current) => ({
        ...current,
        [photo.id]: { status: "done", result }
      }));
    } catch (err) {
      setAnalyses((current) => ({
        ...current,
        [photo.id]: { status: "error", message: err.message }
      }));
    }
  }

  function handleSave(photo) {
    const result = analyses[photo.id]?.result;

    saveCapture({
      src: photo.thumb,
      source: "picsum",
      refId: photo.id,
      author: photo.author,
      scene: "Referência",
      sharpness: result?.sharpness ?? null,
      exposure: result?.exposure ?? null,
      composition: result?.composition ?? null,
      overall: result?.overall ?? null
    });
  }

  const initialLoading = status === "loading" && photos.length === 0;
  const initialError = status === "error" && photos.length === 0;

  return (
    <section className="wrap py-10 sm:py-14">
      <SectionHead eyebrow="Referências" title="Fotos de referência.">
        As fotos vêm da API pública Lorem Picsum. Você pode medir
        nitidez, exposição e composição de cada uma com o mesmo algoritmo
        da câmera e salvar as favoritas na galeria.
      </SectionHead>

      <label className="relative block max-w-md">
        <span className="sr-only">Buscar por autor</span>

        <Icon
          name="search"
          className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        />

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por autor"
          className="w-full rounded-full border border-line bg-surface-2 py-3 pl-11 pr-4 text-ink placeholder:text-muted focus:border-lime"
        />
      </label>

      <div className="mt-6">
        {initialLoading && (
          <StateMessage kind="loading" title="Carregando fotos…">
            Buscando referências na API.
          </StateMessage>
        )}

        {initialError && (
          <StateMessage
            kind="error"
            title="Não foi possível carregar as fotos"
            action={
              <Button variant="secondary" onClick={retry}>
                <Icon name="refresh" className="h-4 w-4" />
                Tentar novamente
              </Button>
            }
          >
            {error}
          </StateMessage>
        )}

        {status === "success" && photos.length === 0 && (
          <StateMessage title="A API não retornou fotos">
            Tente novamente em instantes.
          </StateMessage>
        )}

        {photos.length > 0 && filtered.length === 0 && (
          <StateMessage title="Nenhum resultado">
            Nenhum autor carregado corresponde a “{query}”.
          </StateMessage>
        )}

        {filtered.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((photo) => {
              const analysis = analyses[photo.id];
              const saved = savedIds.has(photo.id);

              return (
                <li
                  key={photo.id}
                  className="overflow-hidden rounded-2xl border border-line bg-surface"
                >
                  <img
                    src={photo.thumb}
                    alt={`Foto de ${photo.author}`}
                    loading="lazy"
                    width="480"
                    height="320"
                    className="aspect-[3/2] w-full bg-surface-2 object-cover"
                  />

                  <div className="p-4">
                    <p className="font-semibold">{photo.author}</p>

                    <p className="font-mono text-[11px] text-muted">
                      original {photo.width}×{photo.height}
                    </p>

                    {analysis?.status === "done" && (
                      <dl className="mt-3 grid grid-cols-4 gap-2 text-center">
                        {[
                          ["Nit.", analysis.result.sharpness],
                          ["Exp.", analysis.result.exposure],
                          ["Comp.", analysis.result.composition],
                          ["Geral", analysis.result.overall]
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="rounded-lg bg-surface-2 py-2"
                          >
                            <dd className="font-mono text-lg text-lime">
                              {value}
                            </dd>

                            <dt className="text-[10px] text-muted">
                              {label}
                            </dt>
                          </div>
                        ))}
                      </dl>
                    )}

                    {analysis?.status === "error" && (
                      <p role="alert" className="mt-3 text-xs text-ember">
                        {analysis.message}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        className="flex-1"
                        disabled={analysis?.status === "loading"}
                        onClick={() => handleAnalyze(photo)}
                      >
                        {analysis?.status === "loading" ? (
                          <Spinner className="h-4 w-4" />
                        ) : null}
                        {analysis?.status === "done"
                          ? "Analisar de novo"
                          : "Analisar"}
                      </Button>

                      {user ? (
                        <Button
                          className="flex-1"
                          disabled={saved}
                          onClick={() => handleSave(photo)}
                        >
                          {saved ? "Salva ✓" : "Salvar"}
                        </Button>
                      ) : (
                        <Button
                          as={Link}
                          to="/login"
                          state={{ from: "/referencias" }}
                          variant="ghost"
                          className="flex-1"
                        >
                          Entrar para salvar
                        </Button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {status === "error" && photos.length > 0 && (
          <div className="mt-4">
            <StateMessage
              kind="error"
              title="Falha ao carregar mais fotos"
              action={
                <Button variant="secondary" onClick={retry}>
                  Tentar novamente
                </Button>
              }
            >
              {error}
            </StateMessage>
          </div>
        )}

        {photos.length > 0 && status !== "error" && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="secondary"
              onClick={loadMore}
              disabled={status === "loading"}
            >
              {status === "loading" ? <Spinner className="h-4 w-4" /> : null}
              {status === "loading" ? "Carregando…" : "Carregar mais fotos"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}