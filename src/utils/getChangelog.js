// Carrega todos os arquivos .md de content/changelog como texto bruto.
// Mesmo padrão usado em getPosts.js.
const modules = import.meta.glob("/src/content/changelog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Parser de frontmatter simples (chave: valor), sem dependências externas.
// Suporta valores entre aspas simples/duplas. Não suporta listas/objetos
// aninhados no frontmatter — só pares chave-valor de uma linha.
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: raw };
  }

  const [, rawFrontmatter, content] = match;
  const data = {};

  rawFrontmatter.split(/\r?\n/).forEach((line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    const isQuoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));

    if (isQuoted) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  });

  return { data, content };
}

// Retorna todas as entradas do changelog, ordenadas da mais recente pra mais antiga.
// Cada entrada: { slug, title, date, type, description }.
// "type" esperado: "novo" | "corrigido" | "alterado" (mas aceita qualquer string).
export function getAllChangelogEntries() {
  const entries = Object.entries(modules).map(([path, raw]) => {
    const { data } = parseFrontmatter(raw);
    const slug = path.split("/").pop().replace(/\.md$/, "");

    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      type: data.type ?? "",
      description: data.description ?? "",
    };
  });

  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Retorna só a entrada mais recente — usada no ChangelogPreview da sidebar.
export function getLatestChangelogEntry() {
  const entries = getAllChangelogEntries();
  return entries.length > 0 ? entries[0] : null;
}
