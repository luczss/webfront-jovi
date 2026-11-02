import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import GalleryCard from "../components/gallery/GalleryCard";
import Button from "../components/ui/Button";
import SectionHead from "../components/ui/SectionHead";
import StateMessage from "../components/ui/StateMessage";
import { useApp } from "../hooks/useApp";

function Stat({ value, label }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <strong className="block font-mono text-2xl text-lime">{value}</strong>

      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}

export default function GalleryPage() {
  const { items, togglePrivacy, deleteItem, storageError } = useApp();
  const [filter, setFilter] = useState("Todos");

  const scenes = useMemo(
    () => ["Todos", ...new Set(items.map((item) => item.scene))],
    [items]
  );

  // Se o filtro escolhido deixou de existir (ex.: última foto excluída).
  const activeFilter = scenes.includes(filter) ? filter : "Todos";

  const visibleItems = useMemo(
    () =>
      activeFilter === "Todos"
        ? items
        : items.filter((item) => item.scene === activeFilter),
    [items, activeFilter]
  );

  const stats = useMemo(() => {
    const scored = items.filter((item) => typeof item.overall === "number");

    return {
      average: scored.length
        ? Math.round(
            scored.reduce((sum, item) => sum + item.overall, 0) /
              scored.length
          )
        : null,
      privateCount: items.filter((item) => item.isPrivate).length
    };
  }, [items]);

  return (
    <section className="wrap py-10 sm:py-14">
      <SectionHead eyebrow="Galeria" title="Suas capturas.">
        As fotos ficam salvas no navegador (localStorage), sem backend.
        Marque como privada para desfocar a miniatura.
      </SectionHead>

      {storageError && (
        <p role="alert" className="mb-4 text-sm text-ember">
          {storageError}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat value={items.length} label="Fotos" />
        <Stat
          value={stats.average === null ? "--" : `${stats.average}%`}
          label="Score médio"
        />
        <Stat value={stats.privateCount} label="Privadas" />
      </div>

      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrar por cena"
      >
        {scenes.map((scene) => (
          <button
            key={scene}
            type="button"
            aria-pressed={activeFilter === scene}
            onClick={() => setFilter(scene)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeFilter === scene
                ? "border-lime text-ink"
                : "border-line text-muted hover:text-ink"
            }`}
          >
            {scene}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {visibleItems.length === 0 ? (
          <StateMessage
            title="Nenhuma foto salva ainda"
            action={
              <div className="flex flex-wrap justify-center gap-3">
                <Button as={Link} to="/camera">
                  Abrir câmera
                </Button>

                <Button as={Link} to="/referencias" variant="secondary">
                  Ver referências
                </Button>
              </div>
            }
          >
            Capture uma foto ou salve uma referência para vê-la aqui.
          </StateMessage>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {visibleItems.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onTogglePrivacy={togglePrivacy}
                onDelete={deleteItem}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}