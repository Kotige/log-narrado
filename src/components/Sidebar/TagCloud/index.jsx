import { getAllTags } from "../../../lib/posts";

export default function TagCloud() {
  const tags = getAllTags();

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 border-t border-sand-line pt-5">
      <h2 className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
        Tags Populares
      </h2>

      <ul className="flex flex-wrap gap-2">
        {tags.map(({ tag, count }) => (
          <li
            key={tag}
            className="rounded-full border border-sand-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.04em] text-muted"
          >
            {tag}{" "}
            <span className="text-sand-line" aria-hidden="true">
              ·
            </span>{" "}
            <span className="sr-only">(</span>
            {count}
            <span className="sr-only">
              {count === 1 ? " post)" : " posts)"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
