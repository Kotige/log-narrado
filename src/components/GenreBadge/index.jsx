const GENRE_LABELS = {
  fantasia: "Fantasia",
  terror: "Terror",
  "ficcao-cientifica": "Ficção Científica",
};

const GENRE_STYLES = {
  fantasia: "border-moss text-moss-dark",
  terror: "border-ink text-ink",
  "ficcao-cientifica": "border-terracota text-terracota",
};

export default function GenreBadge({ genre }) {
  if (!genre) return null;

  const style = GENRE_STYLES[genre] ?? "border-sand-line text-muted";
  const label = GENRE_LABELS[genre] ?? genre;

  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] ${style}`}
    >
      {label}
    </span>
  );
}
