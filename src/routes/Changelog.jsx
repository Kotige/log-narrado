import Header from "../components/Header";
import Footer from "../components/Footer";
import ChangelogTypeBadge from "../components/ChangelogTypeBadge";
import { getAllChangelogEntries } from "../utils/getChangelog";

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

export default function Changelog() {
  const entries = getAllChangelogEntries();

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeHref="/changelog" />

      <main className="mx-auto flex w-full max-w-190 flex-col gap-12 px-8 py-20">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-4xl text-ink">Changelog</h1>
          <p className="text-sm leading-relaxed text-muted">
            O histórico de mudanças do Log Narrado — novidades, ajustes e
            correções, na ordem em que aconteceram.
          </p>
        </div>

        {entries.length === 0 ? (
          <p className="text-sm text-muted">
            Ainda não há entradas no changelog.
          </p>
        ) : (
          <ul className="flex flex-col gap-8">
            {entries.map((entry) => (
              <li
                key={entry.slug}
                className="flex flex-col gap-2 border-t border-sand-line pt-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted">
                    {formatDate(entry.date)}
                  </span>
                  <ChangelogTypeBadge type={entry.type} />
                </div>

                <h2 className="font-display text-xl text-ink">{entry.title}</h2>

                <p className="text-sm leading-relaxed text-muted">
                  {entry.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
