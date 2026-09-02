import { Link } from "react-router-dom";
import ChangelogTypeBadge from "../../ChangelogTypeBadge";
import { getLatestChangelogEntry } from "../../../utils/getChangelog";

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

export default function ChangelogPreview() {
  const entry = getLatestChangelogEntry();

  return (
    <div className="flex flex-col gap-3 border-t border-sand-line pt-5">
      <h4 className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
        Changelog
      </h4>

      {entry ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-muted">
              {formatDate(entry.date)}
            </span>
            <ChangelogTypeBadge type={entry.type} />
          </div>

          <p className="text-sm leading-relaxed text-ink">{entry.title}</p>

          <Link to="/changelog" className="text-sm leading-relaxed text-ink">
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
