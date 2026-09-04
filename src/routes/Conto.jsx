import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GenreBadge from "../components/GenreBadge";
import ReadingProgressBar from "../components/ReadingProgressBar";
import ReadingControls from "../components/ReadingControls";
import { getContoBySlug, getRelatedContos } from "../utils/getFabulario";

const ACCENT_COLOR = "#c76b3f";

const READING_THEMES = {
  light: { bg: "#fbfaf6", text: "#2b2a28" },
  sepia: { bg: "#f4ecd8", text: "#5b4636" },
  dark: { bg: "#1f1e1c", text: "#e8e6df" },
};

const PREFS_KEY = "fabulario:prefs";

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

function progressKey(slug) {
  return `fabulario:progress:${slug}`;
}

export default function Conto() {
  const { slug } = useParams();
  const conto = getContoBySlug(slug);
  const related = getRelatedContos(conto);

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
      // localStorage indisponível (modo privado, etc.) — segue com o padrão.
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

  // Progresso salvo e visibilidade do banner calculados juntos, uma única
  // vez, na primeira renderização — nada de useEffect + setState aqui.
  const [resumeState, setResumeState] = useState(() => {
    if (!conto) return { savedProgress: null, showResumeBanner: false };

    try {
      const raw = localStorage.getItem(progressKey(conto.slug));
      if (raw) {
        const saved = Number(raw);
        if (saved > 200) {
          return { savedProgress: saved, showResumeBanner: true };
        }
      }
    } catch {
      // ignora
    }

    return { savedProgress: null, showResumeBanner: false };
  });
  const { savedProgress, showResumeBanner } = resumeState;

  // Salva preferências sempre que mudam.
  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ fontSize, theme }));
    } catch {
      // ignora se não conseguir salvar
    }
  }, [fontSize, theme]);

  // Salva a posição de rolagem periodicamente enquanto o leitor avança.
  useEffect(() => {
    if (!conto) return;

    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        try {
          localStorage.setItem(progressKey(conto.slug), String(window.scrollY));
        } catch {
          // ignora
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [conto]);

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

  if (!conto) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header activeHref="/projetos" />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-20 text-center">
          <h1 className="font-display text-3xl text-ink">
            Conto não encontrado
          </h1>
          <Link
            to="/projetos/fabulario"
            className="font-mono text-[12px] uppercase tracking-[0.06em] text-moss-dark no-underline hover:text-moss"
          >
            ← Voltar pro Fabulário
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const readingTheme = READING_THEMES[theme];

  return (
    <div
      className="flex min-h-screen flex-col transition-colors duration-200"
      style={{ backgroundColor: readingTheme.bg, color: readingTheme.text }}
    >
      <ReadingProgressBar articleRef={articleRef} accentColor={ACCENT_COLOR} />

      {!focusMode && <Header activeHref="/projetos" />}

      <main
        ref={articleRef}
        className="mx-auto flex w-full max-w-170 flex-col gap-8 px-8 py-20"
        style={{ fontSize: `${fontSize}px` }}
      >
        {/* Cabeçalho do conto */}
        <div className="flex flex-col gap-5">
          {conto.cover && (
            <img
              src={conto.cover}
              alt={`Capa de ${conto.title}`}
              className="aspect-video w-full rounded-sm border object-cover"
              style={{ borderColor: readingTheme.text, opacity: 0.9 }}
            />
          )}

          <div className="flex flex-wrap items-center gap-3">
            <GenreBadge genre={conto.genre} />
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] opacity-70">
              {formatDate(conto.date)}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] opacity-70">
              ~{conto.readingTime} min de leitura
            </span>
          </div>

          <h1
            className="font-display leading-tight"
            style={{ fontSize: `${fontSize * 2}px` }}
          >
            {conto.title}
          </h1>

          {conto.series && (
            <p className="font-mono text-[12px] uppercase tracking-[0.06em] opacity-70">
              {conto.series}
              {conto.part && ` — Parte ${conto.part}`}
            </p>
          )}

          {conto.contentWarning && (
            <div
              className="border-l-2 px-4 py-2 text-sm leading-relaxed opacity-90"
              style={{ borderColor: ACCENT_COLOR }}
            >
              <strong className="font-mono text-[11px] uppercase tracking-[0.06em]">
                Aviso de conteúdo:
              </strong>{" "}
              {conto.contentWarning}
            </div>
          )}
        </div>

        {/* Banner de "continuar de onde parei" */}
        {showResumeBanner && (
          <div
            className="flex flex-wrap items-center justify-between gap-3 border px-4 py-3 text-sm"
            style={{ borderColor: readingTheme.text, opacity: 0.9 }}
          >
            <span>Você já começou este conto.</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: savedProgress, behavior: "smooth" });
                  setResumeState((s) => ({ ...s, showResumeBanner: false }));
                }}
                className="font-mono text-[11px] uppercase tracking-[0.06em] underline"
              >
                Continuar de onde parei
              </button>
              <button
                type="button"
                onClick={() =>
                  setResumeState((s) => ({ ...s, showResumeBanner: false }))
                }
                className="font-mono text-[11px] uppercase tracking-[0.06em] opacity-60"
              >
                Ler do início
              </button>
            </div>
          </div>
        )}

        {/* Corpo do conto */}
        <div className="flex flex-col gap-5" style={{ lineHeight: 1.8 }}>
          <ReactMarkdown
            components={{
              p: (props) => <p className="leading-relaxed" {...props} />,
              h2: (props) => (
                <h2
                  className="font-display pt-4"
                  style={{ fontSize: `${fontSize * 1.4}px` }}
                  {...props}
                />
              ),
              h3: (props) => (
                <h3
                  className="font-display pt-2"
                  style={{ fontSize: `${fontSize * 1.2}px` }}
                  {...props}
                />
              ),
              blockquote: (props) => (
                <blockquote
                  className="border-l-2 pl-4 italic opacity-85"
                  style={{ borderColor: ACCENT_COLOR }}
                  {...props}
                />
              ),
              em: (props) => <em {...props} />,
              strong: (props) => <strong {...props} />,
            }}
          >
            {conto.content}
          </ReactMarkdown>
        </div>

        {/* Mais como esse */}
        {related.length > 0 && (
          <div
            className="mt-8 flex flex-col gap-5 border-t pt-8"
            style={{ borderColor: readingTheme.text, opacity: 0.95 }}
          >
            <h2 className="font-mono text-[12px] uppercase tracking-[0.08em] opacity-70">
              Mais como esse
            </h2>

            <div className="flex flex-col gap-4">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/fabulario/${item.slug}`}
                  className="flex flex-col gap-1 no-underline"
                >
                  <span className="font-display text-lg">{item.title}</span>
                  <span className="text-sm opacity-70">{item.excerpt}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
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
