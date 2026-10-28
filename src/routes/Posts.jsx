import { useState } from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { posts } from "../lib/posts";

const PAGE_SIZE = 6;

export default function Posts() {
  useDocumentMeta({
    title: "Posts",
    description:
      "Todos os textos publicados no Log Narrado, do mais recente pro mais antigo.",
  });

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <Layout className="mx-auto flex w-full max-w-250 flex-col gap-12 px-8 py-20">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-4xl text-ink">Posts</h1>
        <p className="text-sm leading-relaxed text-muted">
          Todos os textos publicados no Log Narrado, do mais recente pro mais
          antigo.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-muted">Ainda não há posts publicados.</p>
      ) : (
        <>
          <div className="grid w-full grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
            {visiblePosts.map((post) => (
              <PostCard key={post.slug} post={post} showExcerpt />
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
    </Layout>
  );
}
