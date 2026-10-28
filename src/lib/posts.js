import { buildPosts } from "./content";

const postFiles = import.meta.glob("/src/content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Rascunhos (draft: true) aparecem no `npm run dev`, mas não no build de produção.
export const posts = buildPosts(Object.entries(postFiles), {
  includeDrafts: !import.meta.env.PROD,
});

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getLatestPost() {
  return posts[0] ?? null;
}

// Os "limit" posts seguintes ao mais recente (que já aparece no Hero).
export function getRecentPosts(limit = 4) {
  return posts.slice(1, 1 + limit);
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

// Todas as tags usadas nos posts, sem repetição, com a contagem de posts em
// que cada uma aparece — da mais usada para a menos usada.
export function getAllTags() {
  const counts = new Map();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
