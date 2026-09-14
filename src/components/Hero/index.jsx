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
    <Link
      to={`/posts/${post.slug}`}
      className="group flex w-full flex-col items-center justify-y-center bg-bg px-8 py-16 text-center no-underline md:h-[66.667vh] md:items-start md:text-left md:py-0"
    >
      <div className="mx-auto flex w-full max-w-240 flex-col items-center md:items-start gap-4">
        <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-terracota">
          Destaque
        </span>
        <h1 className="font-display text-[clamp(2.75rem,7vw,8rem)] leading-[1.05] text-ink transition-colors duration-150 group-hover:text-moss-dark">
          {post.title}
        </h1>

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.06em] text-muted md:text-[13px]">
            <span>{formatDate(post.date)}</span>
            <span className="text-sand-line">·</span>
            <span className="text-terracota">{post.category}</span>
          </div>
          <p className="max-w-[65ch] text-[17px] leading-relaxed text-muted">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
