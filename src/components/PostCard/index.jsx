import { Link } from "react-router-dom";
import { formatDate } from "../../lib/date";

// Card de post usado na Home (RecentPosts) e na listagem /posts.
// `headingLevel` mantém a hierarquia de títulos certa em cada página.
export default function PostCard({ post, headingLevel = "h2", showExcerpt = false }) {
  const Heading = headingLevel;

  return (
    <Link
      to={`/posts/${post.slug}`}
      className="group flex flex-col gap-2 border-t border-sand-line pt-5 no-underline"
    >
      <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em] text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="text-sand-line" aria-hidden="true">
          ·
        </span>
        <span className="text-terracota">{post.category}</span>
      </div>

      <Heading className="font-display text-2xl leading-snug text-ink transition-colors duration-150 group-hover:text-moss-dark">
        {post.title}
      </Heading>

      {showExcerpt && (
        <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
      )}
    </Link>
  );
}
