// Plugin do Vite que roda depois do build e prepara o site para publicação:
//
// - gera um HTML por página (ex.: dist/posts/meu-post.html) com título,
//   descrição, Open Graph e dados estruturados já no <head>. O conteúdo
//   continua sendo montado pelo React no navegador, mas buscadores e prévias
//   de links (WhatsApp, LinkedIn etc.), que não executam JavaScript, passam a
//   ver as informações certas de cada página;
// - gera sitemap.xml, robots.txt e o feed rss.xml.
//
// Na Vercel, `cleanUrls` (vercel.json) serve dist/posts/meu-post.html em
// /posts/meu-post. Como toda página válida tem seu HTML, endereços
// desconhecidos recebem o 404.html com status 404 — que carrega o app
// normalmente, e o React mostra a página "não encontrada".
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildChangelog, buildContos, buildPosts } from "../src/lib/content.js";
import { PROJECT_CATEGORIES } from "../src/data/projects.js";
import {
  AUTHOR,
  DEFAULT_IMAGE,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "../src/data/site.js";

const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function absoluteUrl(urlPath) {
  return /^https?:\/\//.test(urlPath) ? urlPath : `${SITE_URL}${urlPath}`;
}

async function readCollection(dir) {
  const files = (await readdir(dir)).filter((file) => file.endsWith(".md"));
  return Promise.all(
    files.map(async (file) => [
      file,
      await readFile(path.join(dir, file), "utf8"),
    ]),
  );
}

function renderHead(page) {
  const title = page.title ? `${page.title} · ${SITE_NAME}` : SITE_NAME;
  const description = page.description || SITE_DESCRIPTION;
  const url = absoluteUrl(page.path);
  const image = absoluteUrl(page.image || DEFAULT_IMAGE);

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:locale" content="${SITE_LOCALE}" />`,
    `<meta property="og:type" content="${page.type || "website"}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  ];

  if (page.date) {
    tags.push(
      `<meta property="article:published_time" content="${escapeHtml(page.date)}" />`,
    );
  }

  if (page.jsonLd) {
    // "<" escapado para o JSON não conseguir fechar a tag <script>.
    const json = JSON.stringify(page.jsonLd).replaceAll("<", "\\u003c");
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }

  return tags.join("\n    ");
}

function articleJsonLd({ title, description, date, path: urlPath }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    url: absoluteUrl(urlPath),
    inLanguage: "pt-BR",
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: absoluteUrl("/autor"),
    },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

function buildPages({ posts, contos, changelog }) {
  const pages = [
    { path: "/" },
    {
      path: "/posts",
      title: "Posts",
      description:
        "Todos os textos publicados no Log Narrado, do mais recente pro mais antigo.",
    },
    {
      path: "/projetos",
      title: "Projetos",
      description:
        "Projetos de desenvolvimento web, ciência de dados e os contos do Fabulário.",
    },
    {
      path: "/changelog",
      title: "Changelog",
      description:
        "O histórico de mudanças do Log Narrado — novidades, ajustes e correções.",
      date: changelog[0]?.date,
    },
    {
      path: "/autor",
      title: "Autor",
      description:
        "Quem escreve o Log Narrado: professor de física em transição para a ciência de dados, que escreve crônicas e contos.",
    },
  ];

  for (const category of PROJECT_CATEGORIES) {
    pages.push({
      path: `/projetos/${category.slug}`,
      title: category.label,
      description: category.description,
    });
  }

  for (const post of posts) {
    const page = {
      path: `/posts/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      date: post.date,
      type: "article",
    };
    pages.push({ ...page, jsonLd: articleJsonLd(page) });
  }

  for (const conto of contos) {
    const page = {
      path: `/fabulario/${conto.slug}`,
      title: conto.title,
      description: conto.excerpt,
      date: conto.date,
      image: conto.cover,
      type: "article",
    };
    pages.push({ ...page, jsonLd: articleJsonLd(page) });
  }

  return pages;
}

function renderSitemap(pages) {
  const urls = pages
    .map((page) => {
      const lastmod = page.date ? `\n    <lastmod>${page.date}</lastmod>` : "";
      return `  <url>\n    <loc>${escapeHtml(absoluteUrl(page.path))}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function renderRss({ posts, contos }) {
  const items = [
    ...posts.map((post) => ({ ...post, path: `/posts/${post.slug}` })),
    ...contos.map((conto) => ({ ...conto, path: `/fabulario/${conto.slug}` })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((item) => {
      // Meio-dia UTC: a data cai no mesmo dia em qualquer fuso do Brasil.
      const pubDate = new Date(`${item.date}T12:00:00Z`).toUTCString();
      const url = escapeHtml(absoluteUrl(item.path));
      return `    <item>
      <title>${escapeHtml(item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeHtml(item.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeHtml(SITE_NAME)}</title>
    <link>${SITE_URL}/</link>
    <description>${escapeHtml(SITE_DESCRIPTION)}</description>
    <language>pt-BR</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

function renderRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export default function staticPages() {
  let root;
  let outDir;

  return {
    name: "log-narrado:static-pages",
    apply: "build",

    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },

    async closeBundle() {
      const contentDir = path.join(root, "src/content");
      const [postFiles, contoFiles, changelogFiles] = await Promise.all([
        readCollection(path.join(contentDir, "posts")),
        readCollection(path.join(contentDir, "fabulario")),
        readCollection(path.join(contentDir, "changelog")),
      ]);

      const content = {
        posts: buildPosts(postFiles),
        contos: buildContos(contoFiles),
        changelog: buildChangelog(changelogFiles),
      };

      const template = await readFile(path.join(outDir, "index.html"), "utf8");
      if (!SEO_BLOCK.test(template)) {
        throw new Error(
          "index.html precisa do bloco <!-- seo:start --> … <!-- seo:end -->",
        );
      }

      const pages = buildPages(content);

      for (const page of pages) {
        const html = template.replace(SEO_BLOCK, renderHead(page));
        const file =
          page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
        const target = path.join(outDir, file);

        await mkdir(path.dirname(target), { recursive: true });
        await writeFile(target, html);
      }

      await writeFile(
        path.join(outDir, "404.html"),
        template.replace(
          SEO_BLOCK,
          renderHead({ path: "/", title: "Página não encontrada" }),
        ),
      );

      await writeFile(path.join(outDir, "sitemap.xml"), renderSitemap(pages));
      await writeFile(path.join(outDir, "rss.xml"), renderRss(content));
      await writeFile(path.join(outDir, "robots.txt"), renderRobots());
    },
  };
}
