import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import ProjectIcon from "../components/ProjectIcon";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { PROJECT_CATEGORIES } from "../data/projects";

export default function Projects() {
  useDocumentMeta({
    title: "Projetos",
    description:
      "Projetos de desenvolvimento web, ciência de dados e os contos do Fabulário.",
  });

  return (
    <Layout className="grid w-full flex-1 grid-cols-1 md:grid-cols-3 md:py-30">
      <h1 className="sr-only">Projetos</h1>
      {PROJECT_CATEGORIES.map(({ slug, label, description }, i) => (
        <Link
          key={slug}
          to={`/projetos/${slug}`}
          className={`group flex flex-col items-center justify-center gap-4 border-sand-line px-10 py-16 no-underline transition-colors duration-150 hover:bg-sand ${
            i !== PROJECT_CATEGORIES.length - 1
              ? "border-b md:border-b-0 md:border-r"
              : ""
          }`}
        >
          <ProjectIcon slug={slug} size={32} className="text-moss-dark" />

          <h2 className="font-display text-3xl text-ink transition-colors duration-150 group-hover:text-moss-dark">
            {label}
          </h2>

          <p className="max-w-[40ch] text-sm text-center leading-relaxed text-muted">
            {description}
          </p>
        </Link>
      ))}
    </Layout>
  );
}
