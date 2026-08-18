import { getAllTags} from "../../../utils/getPosts";

export default function TagCloud() {
    const tags = getAllTags();

    if (tags.length === 0) return null;

    return (
        <div className="flex flex-col gap-3 border-t border-sand-line pt-5">
            <h4 className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
                Tags Populares
            </h4>

            <div className="flex flex-wrap gap-2">
                {tags.map(({ tag, count }) => (
                    <span
                        key={tag}
                        className="rounded-full border border-sand-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.04em] text-muted"
                    >
                        {tag} <span className="text-sand-line">·</span> {count}
                    </span>
                ))}
            </div>
        </div>
    );
}