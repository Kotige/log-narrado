import { Link } from "react-router-dom";
import { FaLaptopCode, FaChartBar, FaAtom } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CATEGORIES = [
  {
    slug: "web-dev",
    label: "Web Dev",
    description:
      "Aplicações web, sites e ferramentas que uso no dia a dia - de protótipos rápidos a projetos completos.",
    Icon: FaLaptopCode,
  },
  {
    slug: "data-science",
    label: "Data Science",
    description:
      "Análise de dados, modelos preditivos e visualizações explorando padrões escondidos em números.",
    Icon: FaChartBar,
  },
  {
    slug: "physics-lab",
    label: "Physics Lab",
    description:
      "Simulações e experimentos que exploram conceitos de física através de código e visualização.",
    Icon: FaAtom,
  },
];

export default function Projetos() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header activeHref="/projetos" />

      <main className="grid w-full flex-1 grid-cols-1 md:grid-cols-3 md:py-30">
        {CATEGORIES.map(({ slug, label, description, Icon }, i) => (
          <Link
            key={slug}
            to={`/projetos/${slug}`}
            className={`group flex flex-col items-center justify-center gap-4 border-sand-line px-10 py-16 no-underline transition-colors duration-150 hover:bg-sand ${
              i !== CATEGORIES.length - 1
                ? "border-b md:border-b-0 md:border-r"
                : ""
            }`}
          >
            <Icon size={32} className="text-moss-dark" />

            <span className="font-display text-3xl text-ink transition-colors duration-150 group-hover:text-moss-dark">
              {label}
            </span>

            <p className="max-w-[40ch] text-sm text-center  leading-relaxed text-muted">
              {description}
            </p>
          </Link>
        ))}
      </main>

      <Footer />
    </div>
  );
}
