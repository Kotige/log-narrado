import Layout from "../components/Layout";
import ChangelogTypeBadge from "../components/ChangelogTypeBadge";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { changelogEntries } from "../lib/changelog";
import { formatDate } from "../lib/date";

export default function Changelog() {
  useDocumentMeta({
    title: "Changelog",
    description:
      "O histórico de mudanças do Log Narrado — novidades, ajustes e correções.",
  });

  return (
    <Layout className="mx-auto flex w-full max-w-190 flex-col gap-12 px-8 py-20">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-4xl text-ink">Changelog</h1>
        <p className="text-sm leading-relaxed text-muted">
          O histórico de mudanças do Log Narrado — novidades, ajustes e
          correções, na ordem em que aconteceram.
        </p>
      </div>

      {changelogEntries.length === 0 ? (
        <p className="text-sm text-muted">
          Ainda não há entradas no changelog.
        </p>
      ) : (
        <ul className="flex flex-col gap-8">
          {changelogEntries.map((entry) => (
            <li
              key={entry.slug}
              className="flex flex-col gap-2 border-t border-sand-line pt-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <time
                  dateTime={entry.date}
                  className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted"
                >
                  {formatDate(entry.date)}
                </time>
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
    </Layout>
  );
}
