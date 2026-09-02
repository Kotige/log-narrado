const TYPE_STYLES = {
  novo: "border-moss text-moss-dark",
  corrigido: "border-terracotta text-terracotta",
  alterado: "border-sand-line text-muted",
};

export default function ChangelogTypeBadge({ type }) {
  const style = TYPE_STYLES[type] ?? TYPE_STYLES.alterado;

  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] ${style}`}
    >
      {type || "atualização"}
    </span>
  );
}
