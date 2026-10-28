import { Link } from "react-router-dom";
import ChangelogTypeBadge from "../../ChangelogTypeBadge";
import { getLatestChangelogEntry } from "../../../lib/changelog";
import { formatDate } from "../../../lib/date";

export default function ChangelogPreview() {
  const entry = getLatestChangelogEntry();

  return (
    <div className="flex flex-col gap-3 border-t border-sand-line pt-5">
      <h2 className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
        Changelog
      </h2>

      {entry ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <time
              dateTime={entry.date}
              className="font-mono text-[11px] uppercase tracking-[0.04em] text-muted"
            >
              {formatDate(entry.date)}
            </time>
            <ChangelogTypeBadge type={entry.type} />
          </div>

          <p className="text-sm leading-relaxed text-ink">{entry.title}</p>

          <Link
            to="/changelog"
            className="text-sm leading-relaxed text-ink transition-colors duration-150 hover:text-moss-dark"
          >
            Veja o histórico completo →
          </Link>
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-muted">
          Em breve: um resumo das últimas atualizações do blog.
        </p>
      )}
    </div>
  );
}
