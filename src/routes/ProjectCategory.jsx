import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import ProjectIcon from "../components/ProjectIcon";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { getProjectCategory } from "../data/projects";
import NotFound from "./NotFound";

export default function ProjectCategory() {
  const { slug } = useParams();
  const category = getProjectCategory(slug);

  if (!category) {
    return (
      <NotFound
        title="Categoria não encontrada"
        message="Não encontramos essa categoria de projetos. Volte e escolha uma das opções disponíveis."
        backTo="/projetos"
        backLabel="← Voltar pra Projetos"
      />
    );
  }

  return <CategoryContent category={category} />;
}

function CategoryContent({ category }) {
  useDocumentMeta({
    title: category.label,
    description: category.description,
  });

  return (
    <Layout className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-20 text-center">
      <ProjectIcon slug={category.slug} size={40} className="text-moss-dark" />
      <h1 className="font-display text-4xl text-ink md:text-5xl">
        {category.label}
      </h1>

      <p className="max-w-[65ch] text-base leading-relaxed text-muted">
        {category.longDescription}
      </p>

      <div className="mt-8 flex max-w-[60ch] flex-col items-center gap-3 border-t border-sand-line pt-8">
        <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-terracota">
          Em construção
        </span>
        <p className="text-sm leading-relaxed text-muted">
          O Log Narrado é um projeto vivo — ele não nasce pronto, e sim cresce e
          se aprimora aos poucos, um pedaço de cada vez. Essa categoria ainda
          não está sendo construída; volte em breve para acompanhar o que for
          surgindo por aqui.
        </p>
      </div>
    </Layout>
  );
}
