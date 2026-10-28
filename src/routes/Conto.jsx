import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GenreBadge from "../components/GenreBadge";
import ReadingProgressBar from "../components/ReadingProgressBar";
import ReadingControls from "../components/ReadingControls";
import { getContoBySlug, getRelatedContos } from "../lib/contos";
import { formatDate } from "../lib/date";
import { ACCENT_COLOR } from "../lib/readingThemes";
import {
  getReadingProgress,
  getScrollTopForProgress,
} from "../lib/readingProgress";
import useReadingPreferences from "../hooks/useReadingPreferences";
import useFocusMode from "../hooks/useFocusMode";
import useDocumentMeta from "../hooks/useDocumentMeta";
import NotFound from "./NotFound";

// O progresso é salvo como fração do conto (0 a 1), não em pixels: assim a
// posição continua certa mesmo se o tamanho da fonte ou da tela mudar.
const MIN_PROGRESS_TO_RESUME = 0.05;
const FINISHED_PROGRESS = 0.97;
const SAVE_INTERVAL_MS = 500;

function progressKey(slug) {
  return `fabulario:progresso:${slug}`;
}

function loadSavedProgress(slug) {
  try {
    const saved = Number(localStorage.getItem(progressKey(slug)));
    if (saved >= MIN_PROGRESS_TO_RESUME && saved < FINISHED_PROGRESS) {
      return saved;
    }
  } catch {
    // localStorage indisponível (modo privado, etc.)
  }
  return null;
}

export default function Conto() {
  const { slug } = useParams();
  const conto = getContoBySlug(slug);

  if (!conto) {
    return (
      <NotFound
        title="Conto não encontrado"
        message="Esse conto não existe ou mudou de endereço."
        backTo="/projetos/fabulario"
        backLabel="← Voltar pro Fabulário"
      />
    );
  }

  // `key` faz o estado (banner, progresso) recomeçar ao ir de um conto para
  // outro pelo "Mais como esse" — a rota é a mesma, então sem isso o
  // componente seria reaproveitado.
  return <ContoContent key={conto.slug} conto={conto} />;
}

function ContoContent({ conto }) {
  const related = getRelatedContos(conto);
  const articleRef = useRef(null);

  const [focusMode, setFocusMode] = useFocusMode();
  const { fontSize, setFontSize, theme, setTheme, readingTheme } =
    useReadingPreferences();

  // Progresso salvo e visibilidade do banner calculados juntos, uma única
  // vez, na primeira renderização — nada de useEffect + setState aqui.
  const [resumeState, setResumeState] = useState(() => {
    const savedProgress = loadSavedProgress(conto.slug);
    return { savedProgress, showResumeBanner: savedProgress !== null };
  });
  const { savedProgress, showResumeBanner } = resumeState;

  useDocumentMeta({
    title: conto.title,
    description: conto.excerpt || undefined,
    image: conto.cover || undefined,
    type: "article",
  });

  // Salva o progresso enquanto o leitor avança — no máximo a cada
  // SAVE_INTERVAL_MS, e mais uma vez ao sair da página. Ao chegar ao fim,
  // apaga o registro para o banner não aparecer para sempre.
  useEffect(() => {
    let timeout = null;

    function saveProgress() {
      timeout = null;
      const element = articleRef.current;
      if (!element) return;

      const progress = getReadingProgress(element);
      try {
        if (progress >= FINISHED_PROGRESS) {
          localStorage.removeItem(progressKey(conto.slug));
        } else if (progress >= MIN_PROGRESS_TO_RESUME) {
          localStorage.setItem(progressKey(conto.slug), progress.toFixed(4));
        }
      } catch {
        // ignora
      }
    }

    function handleScroll() {
      if (timeout === null) {
        timeout = setTimeout(saveProgress, SAVE_INTERVAL_MS);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pagehide", saveProgress);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", saveProgress);
      if (timeout !== null) clearTimeout(timeout);
    };
  }, [conto.slug]);

  function resumeReading() {
    if (articleRef.current) {
      window.scrollTo({
        top: getScrollTopForProgress(articleRef.current, savedProgress),
        behavior: "smooth",
      });
    }
    setResumeState((s) => ({ ...s, showResumeBanner: false }));
  }

  return (
    <div
      className="flex min-h-screen flex-col transition-colors duration-200"
      style={{ backgroundColor: readingTheme.bg, color: readingTheme.text }}
    >
      <ReadingProgressBar articleRef={articleRef} accentColor={ACCENT_COLOR} />

      {!focusMode && <Header />}

      <main
        id="conteudo"
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
            <time
              dateTime={conto.date}
              className="font-mono text-[11px] uppercase tracking-[0.06em] opacity-70"
            >
              {formatDate(conto.date)}
            </time>
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
            <span>
              Você já leu {Math.round(savedProgress * 100)}% deste conto.
            </span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={resumeReading}
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
