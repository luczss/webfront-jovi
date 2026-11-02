import Icon from "../ui/Icon";

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function GalleryCard({ item, onTogglePrivacy, onDelete }) {
  // Itens da Sprint 3 usam `dataUrl`; os novos usam `src`.
  const source = item.src ?? item.dataUrl;

  return (
    <article
      className={`overflow-hidden rounded-xl border bg-surface ${
        item.isPrivate ? "border-ember" : "border-line"
      }`}
    >
      <div className="relative aspect-square bg-surface-2">
        <img
          src={source}
          alt={`Foto — ${item.scene}`}
          loading="lazy"
          className={`h-full w-full object-cover transition ${
            item.isPrivate ? "blur-xl" : ""
          }`}
        />

        <span className="absolute left-2 top-2 rounded-full border border-lime-dim bg-black/70 px-2 py-0.5 font-mono text-[10px] text-lime">
          {item.scene}
        </span>

        <button
          type="button"
          onClick={() => onTogglePrivacy(item.id)}
          aria-pressed={Boolean(item.isPrivate)}
          aria-label={
            item.isPrivate ? "Tornar foto visível" : "Marcar foto como privada"
          }
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg border border-line bg-black/70"
        >
          <Icon name={item.isPrivate ? "lock" : "unlock"} className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-between p-3">
        <strong className="font-mono text-sm text-lime">
          {typeof item.overall === "number" ? `${item.overall}%` : "--"}
        </strong>

        <small className="text-[11px] text-muted">
          {item.author ? `${item.author} · ` : ""}
          {formatDate(item.createdAt)}
        </small>
      </div>

      <button
        type="button"
        onClick={() => onDelete(item.id)}
        className="mx-3 mb-3 flex w-[calc(100%-1.5rem)] items-center justify-center gap-2 rounded-lg border border-line py-2 text-sm text-ember transition hover:border-ember"
      >
        <Icon name="trash" className="h-4 w-4" />
        Excluir
      </button>
    </article>
  );
}