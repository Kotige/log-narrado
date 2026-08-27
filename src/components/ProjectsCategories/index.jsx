import { Link } from "react-router-dom";
import { FaLaptopCode, FaChartBar, FaAtom } from "react-icons/fa";

const CATEGORIES = [
  {
    slug: "web-dev",
    label: "Web Dev",
    description: "Sites, apps e ferramentas",
    Icon: FaLaptopCode,
  },
  {
    slug: "data-science",
    label: "Data Science",
    description: "Dados, modelos e análises",
    Icon: FaChartBar,
  },
  {
    slug: "physics-lab",
    label: "Physics Lab",
    description: "Simulações e Experimentos",
    Icon: FaAtom,
  },
];

export default function ProjectsCategories() {
  return (
    <div className="flex w-full flex-col gap-6 border-t border-sand-line pt-10">
      <h2 className="font-display text-4xl text-ink">
        <Link to={"/projetos"}>Projetos</Link>
      </h2>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {CATEGORIES.map(({ slug, label, description, Icon }) => (
          <Link
            key={slug}
            to={`/projetos/${slug}`}
            className="group flex flex-col items-start gap-3 border border-sand-line p-6 no-underline transition-colors duration-150 hover:border-moss"
          >
            <Icon size={26} className="text-moss-dark" />

            <span className="font-display text-xl text-ink transition-colors duration-150 group-hover:text-moss-dark">
              {label}
            </span>

            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
              {description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
