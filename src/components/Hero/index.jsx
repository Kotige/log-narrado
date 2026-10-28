import { Link } from "react-router-dom";
import { getLatestPost } from "../../lib/posts";
import { formatDate } from "../../lib/date";

// Destaque da Home: o título do post mais recente fica sozinho no topo e,
// logo abaixo, o resumo divide a linha com a "ficha da entrada" (número,
// data, tempo de leitura e tags), que ocupa o terço da direita, alinhada à
// sidebar. No desktop, ocupa a altura da tela abaixo do Header (5rem) com o
// conteúdo centralizado na vertical.

function formatEntryNumber(number) {
  return String(number).padStart(2, "0");
}

function readLabel(category) {
  return category === "crônicas" ? "Ler a crônica" : "Ler o post";
}

export default function Hero() {
  const post = getLatestPost();

  if (!post) return null;

  const postUrl = `/posts/${post.slug}`;

  return (
    <section
      aria-labelledby="destaque-titulo"
      className="grid w-full grid-cols-1 content-center gap-x-12 gap-y-6 px-8 pt-16 pb-8 md:min-h-[calc(100svh-5rem)] md:grid-cols-[2fr_1fr] md:py-16"
    >
      {/* Título em destaque */}
      <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
        <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-terracota">
          Destaque
        </span>

        <h1
          id="destaque-titulo"
          className="font-display text-[clamp(2.75rem,7vw,8rem)] leading-[1.05] text-ink"
        >
          <Link
            to={postUrl}
            className="no-underline transition-colors duration-150 hover:text-moss-dark"
          >
            {post.title}
          </Link>
        </h1>
      </div>

      {/* Resumo, trecho e chamada */}
      <div className="flex flex-col items-center gap-6 text-center md:col-start-1 md:items-start md:text-left">
        <p className="max-w-[65ch] text-[17px] leading-relaxed text-muted">
          {post.excerpt}
        </p>

        {post.quote && (
          <blockquote className="max-w-[48ch] border-l-2 border-terracota pl-5 text-left font-display text-xl italic leading-snug text-ink/80 md:text-2xl">
            “{post.quote}”
          </blockquote>
        )}

        <Link
          to={postUrl}
          className="font-mono text-[12px] uppercase tracking-[0.06em] text-moss-dark no-underline transition-colors duration-150 hover:text-moss"
        >
          {readLabel(post.category)} →
        </Link>
      </div>

      {/* Ficha da entrada: começa na mesma altura do resumo */}
      <aside
        aria-label="Sobre este texto"
        className="mt-6 flex flex-col gap-4 self-start border-t border-sand-line pt-4 md:col-start-2 md:row-start-2 md:mt-0"
      >
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            Entrada
          </span>
          <span className="font-display text-3xl leading-none text-terracota">
            <span className="sr-only">número </span>
            {formatEntryNumber(post.entryNumber)}
          </span>
        </div>

        <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.06em]">
          <dt className="text-muted">Publicado</dt>
          <dd className="text-ink">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </dd>

          <dt className="text-muted">Leitura</dt>
          <dd className="text-ink">~{post.readingTime} min</dd>

          <dt className="text-muted">Categoria</dt>
          <dd className="text-terracota">{post.category}</dd>
        </dl>

        {post.tags.length > 0 && (
          <ul aria-label="Tags" className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-sand-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.04em] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </aside>
    </section>
  );
}
