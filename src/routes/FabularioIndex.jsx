import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GenreBadge from "../components/GenreBadge";
import { getAllContos } from "../utils/getFabulario";
import { FaFeatherAlt } from "react-icons/fa";

export default function FabularioIndex() {
  const contos = getAllContos();

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeHref="/projetos" />

      <main className="mx-auto flex w-full max-w-300 flex-col gap-10 px-8 py-20">
        <div className="flex flex-col gap-2 text-center items-center">
          <FaFeatherAlt size={40} className="text-moss-dark" />
          <h1 className="font-display text-4xl text-ink">Fabulário</h1>
          <p className="md:px-60">
            Um espaço para contos de fantasia, terror e ficção científica —
            histórias curtas que nascem da mesma curiosidade que move o resto do
            Log Narrado, só que contada de um jeito diferente: não como
            registro, mas como narrativa.
          </p>
        </div>

        {contos.length === 0 ? (
          <p className="text-sm text-muted">
            O Log Narrado é um projeto vivo — ele não nasce pronto, e sim cresce
            e se aprimora aos poucos, um pedaço de cada vez. Essa categoria
            ainda não está sendo construída; volte em breve para acompanhar o
            que for surgindo por aqui.
          </p>
        ) : (
          <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-4">
            {contos.map((conto) => (
              <Link
                key={conto.slug}
                to={`/fabulario/${conto.slug}`}
                className="group flex flex-col gap-3 no-underline"
              >
                <div className="aspect-2/3 w-full overflow-hidden border border-sand-line bg-sand">
                  {conto.cover && (
                    <img
                      src={conto.cover}
                      alt={`Capa de ${conto.title}`}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <GenreBadge genre={conto.genre} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
                      ~{conto.readingTime} min
                    </span>
                  </div>

                  <h2 className="font-display text-lg leading-snug text-ink transition-colors duration-150 group-hover:text-moss-dark">
                    {conto.title}
                  </h2>

                  <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                    {conto.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
