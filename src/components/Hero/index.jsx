import { Link } from "react-router-dom";
import { getLatestPost } from "../../utils/getPosts";

function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;

    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default function Hero() {
    const post = getLatestPost();

    if (!post) return null;

    return (
        < Link
            to={`/posts/${post.slug}`}
            className="group flex h-screen w-full flex-col justify-center bg-bg px-8 no-underline md:h-[66.667vh]"
        > 
            <div className="mx-auto flex w-full max-w-[960px] flex-col gap-4">
                <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] text-ink transition-colors duration-150 group-hover:text-moss-dark">
                    {post.title}
                </h1>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] md:text-[13px] uppercase tracking-[0.06em] text-muted">
                        <span>{formatDate(post.date)}</span>
                        <span className="text-sand-line">·</span>
                        <span className="text-terracota">{post.category}</span>
                    </div>

                    <p className="max-w-[65ch] text-[17px] leading-relaxed text-muted">
                        {post.excerpt}
                    </p>
                </div>
            </div>
        </ Link>
    );
}