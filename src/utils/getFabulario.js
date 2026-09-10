const modules = import.meta.glob("/src/content/fabulario/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Mesmo parser usado no resto do projeto.

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: raw };
  }

  const [, frontmatterBlock, content] = match;
  const data = {};

  for (const line of frontmatterBlock.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    value = value.replace(/^["']|["']$/g, "");

    data[key] = value;
  }

  return { data, content: content.trim() };
}

// ~200 palavras por minuto é a média usada para tempo de leitura em prosa.
// Arredonda para cima e nunca mostra menos que 1 minuto.

function estimateReadingTime(content) {
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 200));
}

function buildConto(path, raw) {
  const { data, content } = parseFrontmatter(raw);
  const slug = path.split("/").pop().replace(/\.md$/, "");

  return {
    slug,
    content,
    title: data.title ?? "",
    category: data.category ?? "fabulario",
    genre: data.genre ?? "",
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    cover: data.cover ?? "",
    contentWarning: data.contentWarning ?? "",
    series: data.part ?? "",
    readingTime: estimateReadingTime(content),
  };
}

export function getAllContos() {
  return Object.entries(modules)
    .map(([path, raw]) => buildConto(path, raw))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getContoBySlug(slug) {
  return getAllContos().find((conto) => conto.slug === slug) ?? null;
}

// Retorna outros contos do mesmo gênero, excluindo o atual - usado no
// "mais como esse" ao final da leitura.

export function getRelatedContos(conto, limit = 2) {
  if (!conto) return [];

  return getAllContos()
    .filter((c) => c.slug !== conto.slug && c.genre === conto.genre)
    .slice(0, limit);
}
