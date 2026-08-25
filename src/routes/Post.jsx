import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAdjacentPosts } from "../lib/posts";

function formatEntryNumber(number) {
  return String(number).padStart(2, "0");
}

export default function Post() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p>Post não encontrado.</p>
        <Link to="/" className="text-moss-dark">
          Voltar
        </Link>
      </div>
    );
  }

  const { olderPost, newerPost } = getAdjacentPosts(slug);

  return (
    <article className="max-w-3xl mx-auto px-6 py-14 pb-24">
      <Link
        to="/"
        className="font-mono text-sm text-muted hover:text-moss-dark transition-colors"
      >
        ← voltar
      </Link>

      <div className="flex flex-wrap items-center gap-2 mt-10 font-mono text-sm text-muted">
        <span className="text-terracotta font-medium">
          {formatEntryNumber(post.entryNumber)}
        </span>
        <span className="text-sand-line">·</span>
        <span>{post.date}</span>
        <span className="text-sand-line">·</span>
        <span className="text-moss font-medium">{post.category}</span>
        <span className="ml-auto inline-flex items-center rounded-full border border-sand-line px-3 py-0.5 text-xs">
          {post.readingTime} min de leitura
        </span>
      </div>

      <h1 className="font-display text-4xl md:text-5xl leading-tight mt-4">
        {post.title}
      </h1>

      {post.excerpt && (
        <p className="font-display italic text-xl text-muted mt-4">
          {post.excerpt}
        </p>
      )}

      <hr className="border-sand-line my-9" />

      <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-normal prose-strong:text-moss-dark prose-a:text-moss hover:prose-a:text-moss-dark prose-blockquote:border-terracotta prose-blockquote:not-italic prose-blockquote:text-muted">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {(olderPost || newerPost) && (
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 pt-8 border-t border-sand-line">
          {olderPost ? (
            <Link
              to={`/posts/${olderPost.slug}`}
              className="flex flex-col gap-2 p-5 border border-sand-line rounded hover:border-moss hover:bg-moss/5 transition-colors"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide text-terracotta">
                ← post anterior
              </span>
              <span className="font-display text-xl leading-snug">
                {olderPost.title}
              </span>
              <span className="font-mono text-xs text-muted">
                {olderPost.category}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {newerPost ? (
            <Link
              to={`/posts/${newerPost.slug}`}
              className="flex flex-col items-end gap-2 p-5 border border-sand-line rounded text-right hover:border-moss hover:bg-moss/5 transition-colors"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide text-terracotta">
                próximo post →
              </span>
              <span className="font-display text-xl leading-snug">
                {newerPost.title}
              </span>
              <span className="font-mono text-xs text-muted">
                {newerPost.category}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}
    </article>
  );
}
