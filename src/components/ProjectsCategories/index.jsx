import { Link } from "react-router-dom";
import ProjectIcon from "../ProjectIcon";
import { PROJECT_CATEGORIES } from "../../data/projects";

export default function ProjectsCategories() {
  return (
    <div className="flex w-full flex-col gap-6 border-t border-sand-line pt-10">
      <h2 className="font-display text-3xl text-ink">
        <Link to="/projetos">Projetos</Link>
      </h2>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {PROJECT_CATEGORIES.map(({ slug, label, summary }) => (
          <Link
            key={slug}
            to={`/projetos/${slug}`}
            className="group flex flex-col items-start gap-3 border border-sand-line p-6 no-underline transition-colors duration-150 hover:border-moss"
          >
            <ProjectIcon slug={slug} className="text-moss-dark" />

            <span className="font-display text-xl text-ink transition-colors duration-150 group-hover:text-moss-dark">
              {label}
            </span>

            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
              {summary}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
