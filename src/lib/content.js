// Monta as coleções de conteúdo (posts, contos e changelog) a partir dos
// arquivos .md. Recebe pares [caminho, texto bruto], então funciona tanto com
// o import.meta.glob do Vite (no navegador) quanto com arquivos lidos do disco
// (no build, para gerar sitemap, RSS e as meta tags de cada página).
import { parseFrontmatter } from "./markdown.js";

const WORDS_PER_MINUTE = 200;

export function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

export function estimateReadingTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// Mais recente primeiro. Datas iguais são desempatadas pelo slug, para a
// ordem não depender da ordem em que os arquivos foram lidos.
export function byNewest(a, b) {
  return b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug);
}

function asString(value) {
  return typeof value === "string" ? value : "";
}

function loadEntries(files, { includeDrafts }) {
  return files
    .map(([path, raw]) => ({
      slug: slugFromPath(path),
      ...parseFrontmatter(raw),
    }))
    .filter(({ data }) => includeDrafts || data.draft !== true);
}

export function buildPosts(files, { includeDrafts = false } = {}) {
  const posts = loadEntries(files, { includeDrafts })
    .map(({ slug, data, content }) => ({
      slug,
      title: asString(data.title) || "Sem título",
      date: asString(data.date),
      category: asString(data.category),
      tags: Array.isArray(data.tags) ? data.tags : [],
      excerpt: asString(data.excerpt),
      // Trecho opcional do próprio texto, exibido no destaque da Home.
      quote: asString(data.quote),
      draft: data.draft === true,
      content,
      readingTime: estimateReadingTime(content),
    }))
    .sort(byNewest);

  // Numeração de campo (01, 02, 03...) em ordem cronológica de publicação,
  // independente da ordem de exibição (mais recentes primeiro na listagem).
  return posts.map((post, index) => ({
    ...post,
    entryNumber: posts.length - index,
  }));
}

export function buildContos(files, { includeDrafts = false } = {}) {
  return loadEntries(files, { includeDrafts })
    .map(({ slug, data, content }) => ({
      slug,
      title: asString(data.title) || "Sem título",
      date: asString(data.date),
      genre: asString(data.genre),
      excerpt: asString(data.excerpt),
      cover: asString(data.cover),
      contentWarning: asString(data.contentWarning),
      series: asString(data.series),
      part: asString(data.part),
      draft: data.draft === true,
      content,
      readingTime: estimateReadingTime(content),
    }))
    .sort(byNewest);
}

// "type" esperado: "novo" | "corrigido" | "alterado" (mas aceita qualquer string).
export function buildChangelog(files, { includeDrafts = false } = {}) {
  return loadEntries(files, { includeDrafts })
    .map(({ slug, data, content }) => ({
      slug,
      title: asString(data.title),
      date: asString(data.date),
      type: asString(data.type),
      description: asString(data.description),
      content,
    }))
    .sort(byNewest);
}
