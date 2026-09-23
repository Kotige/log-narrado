import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAdjacentPosts } from "../lib/posts";
import Header from "../components/Header";
import ReadingProgressBar from "../components/ReadingProgressBar";
import ReadingControls from "../components/ReadingControls";

const ACCENT_COLOR = "#c76b3f";

const READING_THEMES = {
  light: { bg: "#fbfaf6", text: "#2b2a28" },
  sepia: { bg: "#f4ecd8", text: "#5b4636" },
  dark: { bg: "#1f1e1c", text: "#e8e6df" },
};

const PREFS_KEY = "posts:reading-prefs";

function formatEntryNumber(number) {
  return String(number).padStart(2, "0");
}

export default function Post() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const articleRef = useRef(null);

  const [focusMode, setFocusMode] = useState(false);

  const [fontSize, setFontSize] = useState(() => {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) {
        const prefs = JSON.parse(raw);
        if (prefs.fontSize) return prefs.fontSize;
      }
    } catch {
      // localStorage indisponível — segue com o padrão.
    }
    return 18;
  });

  const [theme, setTheme] = useState(() => {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) {
        const prefs = JSON.parse(raw);
        if (prefs.theme) return prefs.theme;
      }
    } catch {
      // ignora
    }
    return "light";
  });

  // Salva as preferências de leitura sempre que mudam.
  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ fontSize, theme }));
    } catch {
      // ignora
    }
  }, [fontSize, theme]);

  // Atalhos de teclado: L alterna o modo leitura, Esc sempre sai dele.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && focusMode) {
        setFocusMode(false);
      }
      if (
        (event.key === "l" || event.key === "L") &&
        !event.metaKey &&
        !event.ctrlKey
      ) {
        setFocusMode((current) => !current);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusMode]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Header />
        <p>Post não encontrado.</p>
        <Link to="/" className="text-moss-dark">
          Voltar
        </Link>
      </div>
    );
  }

  const { olderPost, newerPost } = getAdjacentPosts(slug);
  const readingTheme = READING_THEMES[theme];

  return (
    <div
      className="flex flex-col transition-colors duration-200"
      style={{ backgroundColor: readingTheme.bg, color: readingTheme.text }}
    >
      <ReadingProgressBar articleRef={articleRef} accentColor={ACCENT_COLOR} />

      {!focusMode && <Header activeHref="/posts" />}

      <article
        ref={articleRef}
        className="max-w-3xl mx-auto px-6 py-14 pb-24"
        style={{ fontSize: `${fontSize}px` }}
      >
        <Link
          to="/"
          className="font-mono text-sm opacity-70 transition-opacity hover:opacity-100"
        >
          ← voltar
        </Link>

        <div className="flex flex-wrap items-center gap-2 mt-10 font-mono text-sm opacity-80">
          <span style={{ color: ACCENT_COLOR }} className="font-medium">
            {formatEntryNumber(post.entryNumber)}
          </span>
          <span className="opacity-50">·</span>
          <span>{post.date}</span>
          <span className="opacity-50">·</span>
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
          className="prose prose-neutral md:prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-p:leading-[1.9] prose-p:mb-7 prose-p:text-justify prose-p:indent-8 prose-strong:text-moss-dark prose-a:text-moss hover:prose-a:text-moss-dark prose-blockquote:border-terracotta prose-blockquote:not-italic"
          style={{
            "--tw-prose-body": readingTheme.text,
            "--tw-prose-headings": readingTheme.text,
            "--tw-prose-bold": readingTheme.text,
            "--tw-prose-quotes": readingTheme.text,
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {(olderPost || newerPost) && (
          <nav
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
