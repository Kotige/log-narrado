import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllPosts } from "../utils/getPosts";

const PAGE_SIZE = 6;

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

function PostCard({ post }) {
  return (
    <Link
      to={`/posts/${post.slug}`}
      className="group flex flex-col gap-2 border-t border-sand-line pt-5 no-underline"
    >
      <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em] text-muted">
        <span>{formatDate(post.date)}</span>
        <span className="text-sand-line">·</span>
        <span className="text-terracota">{post.category}</span>
      </div>

      <h2 className="font-dsiplay text-2xl leading-snug text-ink transition-colors duration-150 group-hover:text-moss-dark">
        {post.title}
      </h2>

      <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
    </Link>
  );
}

export default function Posts() {
  const allPosts = [...getAllPosts()].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visiblePosts = allPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allPosts.length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeHref="/posts" />

      <main className="mx-auto flex w-full max-w-250 flex-col gap-12 px-8 py-20">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-4xl text-ink">Posts</h1>
          <p className="text-sm leading-relaxed text-muted">
            Todos os textos publicados no Log Narrado, do mais recente pro mais
            antigo.
          </p>
        </div>

        {allPosts.length === 0 ? (
          <p className="text-sm text-muted">Ainda não há posts publicados.</p>
        ) : (
          <>
            <div className="grid w-full grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
              {visiblePosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            {hasMore && (
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="mx-auto border border-sand-line px-6 py-2.5 font-mono text-[12px] uppercase tracking-[0.06em] text-moss-dark transition-colors duration-150 hover:bg-sand"
              >
                Carregar mais
              </button>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
