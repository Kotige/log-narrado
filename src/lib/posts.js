import { parseFrontmatter } from "./markdown";

const postFiles = import.meta.glob("/src/content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const WORDS_PER_MINUTE = 200;

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

function estimateReadingTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const rawPosts = Object.entries(postFiles).map(([path, raw]) => {
  const { data, content } = parseFrontmatter(raw);
  return {
    slug: slugFromPath(path),
    title: data.title ?? "Sem título",
    date: data.date ?? "",
    category: data.category ?? "",
    excerpt: data.excerpt ?? "",
    content,
    readingTime: estimateReadingTime(content),
  };
});

// Numeração de campo (01, 02, 03...) em ordem cronológica de publicação,
// independente da ordem de exibição (mais recentes primeiro na listagem).
const chronological = [...rawPosts].sort(
  (a, b) => new Date(a.date) - new Date(b.date),
);
const entryNumberBySlug = new Map(
  chronological.map((post, index) => [post.slug, index + 1]),
);

export const posts = rawPosts
  .map((post) => ({ ...post, entryNumber: entryNumberBySlug.get(post.slug) }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

// "Post anterior" = publicado antes (mais antigo) · "próximo post" = publicado depois (mais recente).
// Como `posts` está ordenado do mais recente para o mais antigo, isso significa
// andar para frente no array (index + 1) para achar o mais antigo, e para trás
// (index - 1) para achar o mais recente.
export function getAdjacentPosts(slug) {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return { olderPost: null, newerPost: null };
  }

  return {
    olderPost: posts[index + 1] ?? null,
    newerPost: posts[index - 1] ?? null,
  };
}
