import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAdjacentPosts } from "../lib/posts";
import { formatDate } from "../lib/date";
import { ACCENT_COLOR } from "../lib/readingThemes";
import useReadingPreferences from "../hooks/useReadingPreferences";
import useFocusMode from "../hooks/useFocusMode";
import useDocumentMeta from "../hooks/useDocumentMeta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReadingProgressBar from "../components/ReadingProgressBar";
import ReadingControls from "../components/ReadingControls";
import NotFound from "./NotFound";

function formatEntryNumber(number) {
  return String(number).padStart(2, "0");
}

export default function Post() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <NotFound
        title="Post não encontrado"
        message="Esse post não existe ou mudou de endereço."
        backTo="/posts"
        backLabel="← Ver todos os posts"
      />
    );
  }

  return <PostContent post={post} />;
}

function PostContent({ post }) {
  const articleRef = useRef(null);
  const [focusMode, setFocusMode] = useFocusMode();
  const { fontSize, setFontSize, theme, setTheme, readingTheme } =
    useReadingPreferences();

  useDocumentMeta({
    title: post.title,
    description: post.excerpt || undefined,
    type: "article",
  });

  const { olderPost, newerPost } = getAdjacentPosts(post.slug);

  return (
    <div
      className="flex min-h-screen flex-col transition-colors duration-200"
      style={{ backgroundColor: readingTheme.bg, color: readingTheme.text }}
    >
      <ReadingProgressBar articleRef={articleRef} accentColor={ACCENT_COLOR} />

      {!focusMode && <Header />}

      <main id="conteudo" className="flex-1">
        <article
          ref={articleRef}
          className="max-w-3xl mx-auto px-6 py-14 pb-24"
          style={{ fontSize: `${fontSize}px` }}
        >
          <Link
            to="/posts"
            className="font-mono text-sm opacity-70 transition-opacity hover:opacity-100"
          >
            ← todos os posts
          </Link>

          <div className="flex flex-wrap items-center gap-2 mt-10 font-mono text-sm opacity-80">
            <span style={{ color: ACCENT_COLOR }} className="font-medium">
              {formatEntryNumber(post.entryNumber)}
            </span>
            <span className="opacity-50" aria-hidden="true">
              ·
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="opacity-50" aria-hidden="true">
              ·
            </span>
            <span className="text-moss font-medium">{post.category}</span>
            <span
              className="ml-auto inline-flex items-center rounded-full px-3 py-0.5 text-xs"
              style={{ border: `1px solid ${readingTheme.text}33` }}
            >
              {post.readingTime} min de leitura
            </span>
          </div>

          <h1
            className="font-display leading-tight mt-4"
            style={{ fontSize: `${fontSize * 2.2}px` }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p
              className="font-display italic opacity-70 mt-4"
              style={{ fontSize: `${fontSize * 1.1}px` }}
            >
              {post.excerpt}
            </p>
          )}

          <hr
            className="my-9"
            style={{ borderColor: `${readingTheme.text}33` }}
          />

          <div
            className="prose prose-neutral md:prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-p:leading-[1.9] prose-p:mb-7 md:prose-p:text-justify prose-p:indent-8 prose-a:text-moss hover:prose-a:text-moss-dark prose-blockquote:border-terracota prose-blockquote:not-italic"
            style={{
              "--tw-prose-body": readingTheme.text,
              "--tw-prose-headings": readingTheme.text,
              "--tw-prose-bold": readingTheme.strong,
              "--tw-prose-quotes": readingTheme.text,
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {post.tags.length > 0 && (
            <ul aria-label="Tags" className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.04em] opacity-80"
                  style={{ border: `1px solid ${readingTheme.text}33` }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {(olderPost || newerPost) && (
            <nav
              aria-label="Navegação entre posts"
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 pt-8"
              style={{ borderTop: `1px solid ${readingTheme.text}22` }}
            >
              {olderPost ? (
                <Link
                  to={`/posts/${olderPost.slug}`}
                  className="flex flex-col gap-2 rounded p-5 transition-opacity hover:opacity-80"
                  style={{ border: `1px solid ${readingTheme.text}33` }}
                >
                  <span
                    style={{ color: ACCENT_COLOR }}
                    className="font-mono text-[11px] uppercase tracking-wide"
                  >
                    ← post anterior
                  </span>
                  <span className="font-display text-xl leading-snug">
                    {olderPost.title}
                  </span>
                  <span className="font-mono text-xs opacity-70">
                    {olderPost.category}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {newerPost ? (
                <Link
                  to={`/posts/${newerPost.slug}`}
                  className="flex flex-col items-end gap-2 rounded p-5 text-right transition-opacity hover:opacity-80"
                  style={{ border: `1px solid ${readingTheme.text}33` }}
                >
                  <span
                    style={{ color: ACCENT_COLOR }}
                    className="font-mono text-[11px] uppercase tracking-wide"
                  >
                    próximo post →
                  </span>
                  <span className="font-display text-xl leading-snug">
                    {newerPost.title}
                  </span>
                  <span className="font-mono text-xs opacity-70">
                    {newerPost.category}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}
        </article>
      </main>

      {!focusMode && <Footer />}

      <ReadingControls
        focusMode={focusMode}
        onToggleFocusMode={() => setFocusMode((current) => !current)}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        theme={theme}
        onThemeChange={setTheme}
        accentColor={ACCENT_COLOR}
      />
    </div>
  );
}
