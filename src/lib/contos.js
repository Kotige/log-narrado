import { buildContos } from "./content";

const contoFiles = import.meta.glob("/src/content/fabulario/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const contos = buildContos(Object.entries(contoFiles), {
  includeDrafts: !import.meta.env.PROD,
});

export function getContoBySlug(slug) {
  return contos.find((conto) => conto.slug === slug) ?? null;
}

// Outros contos do mesmo gênero, excluindo o atual — usado no "Mais como
// esse" ao final da leitura.
export function getRelatedContos(conto, limit = 2) {
  if (!conto) return [];

  return contos
    .filter((c) => c.slug !== conto.slug && c.genre === conto.genre)
    .slice(0, limit);
}
