import { useParams, Link } from "react-router-dom";
import { FaLaptopCode, FaChartBar, FaAtom } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CATEGORIES = {
  "web-dev": {
    label: "Web Dev",
    Icon: FaLaptopCode,
    description:
      "Projetos de desenvolvimento web — sites, aplicações e ferramentas que construo para resolver problemas reais do dia a dia, testar ideias novas ou simplesmente aprender fazendo. Aqui entram tanto experimentos rápidos quanto projetos mais elaborados, sempre com o código aberto para quem quiser dar uma olhada por dentro.",
  },
  "data-science": {
    label: "Data Science",
    Icon: FaChartBar,
    description:
      "Projetos de análise de dados, modelos preditivos e visualizações — um jeito de explorar padrões e histórias escondidas em conjuntos de dados, unindo estatística, programação e uma boa dose de curiosidade sobre o que os números têm a dizer.",
  },
  "physics-lab": {
    label: "Physics Lab",
    Icon: FaAtom,
    description:
      "Simulações e experimentos que exploram conceitos de física através de código e visualização — uma forma de tornar tangível o que normalmente, na mente das pessoas, vive só em equações, unindo a paixão por física com a prática de programar.",
  },
};

export default function ProjectCategory() {
  const { slug } = useParams();
  const category = CATEGORIES[slug];

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeHref="/projetos" />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-20 text-center">
        {category ? (
          <>
            <category.Icon size={40} className="text-moss-dark" />
            <h1 className="font-display text-4xl text-ink md:text-5xl">
              {category.label}
            </h1>

            <p className="max-w-[65ch] text-base leading-relaxed text-muted">
              {category.description}
            </p>

            <div className="mt-8 flex max-w-[60ch] flex-col items-center gap-3 border-t border-sand-line pt-8">
              <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-terracota">
                Em construção
              </span>
              <p className="text-sm leading-relaxed text-muted">
                O Log Narrado é um projeto vivo — ele não nasce pronto, e sim
                cresce e se aprimora aos poucos, um pedaço de cada vez. Essa
                categoria ainda não está sendo construída; volte em breve para
                acompanhar o que for surgindo por aqui.
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-disply text-4xl text-ink">
              Categoria não encontrada
            </h1>

            <p className="max-w-[50ch] text-sm leading-relaxed text-muted">
              Não encontramos essa categoria de projetos. Volte e escolha uma
              das opções disponíveis.
            </p>

            <Link
              to="/projetos"
              className="font-mono text-[12px] uppercase tracking-[0.06em] text-moss-dark no-underline hover:text-moss"
            >
              ← Voltar pra Projetos
            </Link>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
