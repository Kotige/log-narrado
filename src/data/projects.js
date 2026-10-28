// Categorias de projetos. `summary` aparece nos cards da Home, `description`
// na página /projetos e `longDescription` na página da categoria.
// Também é lido no build (vite.config.js), então não importe ícones aqui.
export const PROJECT_CATEGORIES = [
  {
    slug: "web-dev",
    label: "Web Dev",
    summary: "Sites, apps e ferramentas",
    description:
      "Aplicações web, sites e ferramentas que uso no dia a dia — de protótipos rápidos a projetos completos.",
    longDescription:
      "Projetos de desenvolvimento web — sites, aplicações e ferramentas que construo para resolver problemas reais do dia a dia, testar ideias novas ou simplesmente aprender fazendo. Aqui entram tanto experimentos rápidos quanto projetos mais elaborados, sempre com o código aberto para quem quiser dar uma olhada por dentro.",
  },
  {
    slug: "data-science",
    label: "Data Science",
    summary: "Dados, modelos e análises",
    description:
      "Análise de dados, modelos preditivos e visualizações explorando padrões escondidos em números.",
    longDescription:
      "Projetos de análise de dados, modelos preditivos e visualizações — um jeito de explorar padrões e histórias escondidas em conjuntos de dados, unindo estatística, programação e uma boa dose de curiosidade sobre o que os números têm a dizer.",
  },
  {
    slug: "fabulario",
    label: "Fabulário",
    summary: "Fantasia, terror e ficção",
    description:
      "Contos de fantasia, terror e ficção científica — narrativas curtas publicadas aqui.",
    longDescription:
      "Um espaço para contos de fantasia, terror e ficção científica — histórias curtas que nascem da mesma curiosidade que move o resto do Log Narrado, só que contadas de um jeito diferente: não como registro, mas como narrativa.",
  },
];

export function getProjectCategory(slug) {
  return PROJECT_CATEGORIES.find((category) => category.slug === slug) ?? null;
}
