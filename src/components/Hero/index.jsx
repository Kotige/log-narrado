import { Link } from "react-router-dom";
import { getLatestPost } from "../../lib/posts";
import { formatDate } from "../../lib/date";

export default function Hero() {
  const post = getLatestPost();

  if (!post) return null;

  return (
    <div className="flex w-full flex-col items-center justify-center bg-bg px-8 py-16 text-center md:h-[66.667vh] md:items-start md:text-left md:py-0">
      <div className="mx-auto flex w-full max-w-240 flex-col items-center md:items-start gap-4">
        <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-terracota">
          Destaque
        </span>
        <h1 className="font-display text-[clamp(2.75rem,7vw,8rem)] leading-[1.05] text-ink">
          <Link
            to={`/posts/${post.slug}`}
            className="no-underline transition-colors duration-150 hover:text-moss-dark"
          >
            {post.title}
          </Link>
        </h1>

        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] md:justify-start uppercase tracking-[0.06em] text-muted md:text-[13px]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-sand-line" aria-hidden="true">
              ·
            </span>
            <span className="text-terracota">{post.category}</span>
          </div>
          <p className="max-w-[65ch] text-[17px] leading-relaxed text-muted">
            {post.excerpt}
          </p>
        </div>
      </div>
    </div>
  );
}
