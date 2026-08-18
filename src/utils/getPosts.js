// Carrega todo arquivo .md de content/posts como texto bruto.
// Ajusta o caminho do glob se a pasta content/posts estiver em outro lugar
// relativo a este arquivo (ex: ""../content/posts/*.md").

const modules = import.meta.glob("/src/content/posts/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
});

// Parser de frontmatter simples (chave: valor), sem dependências externas.
// Suporta valores entre aspas simples/duplas. Não suporta listas/objetos
// aninhados no frontmatter - só pares chave-valor de uma linha.

function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

    if (!match) {
        return {data: {}, content: raw};
    }

    const [, rawFrontmatter, content] = match;
    const data = {};

    rawFrontmatter.split(/\r?\n/).forEach((line) =>{
        const separatorIndex = line.indexOf(":");
        if (separatorIndex === -1) return;

        const key = line.slice(0, separatorIndex).trim();
        let value = line.slice(separatorIndex + 1).trim();

        const isList = value.startsWith("[") && value.endsWith("]");

        if (isList) {
            data[key] = value.slice(1, -1).split(",").map((item) => item.trim().replace(/^["']|["']$/g, "")
            ).filter(Boolean);
            return;
        }

        const isQuoted = (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"));

        if (isQuoted) {
            value = value.slice(1, -1);
        }

        data[key] = value;
    });
    return {data, content};
}

// Retorna todos os posts, cada um com {slug, title, date, category, excerpt, content}.
// slug é derivado do nome do arquivo.

export function getAllPosts() {
    return Object.entries(modules).map(([Path2D, raw]) => {
        const { data, content } = parseFrontmatter(raw);
        const slug = Path2D.split("/").pop().replace(/\.md$/, "");

        return {
            slug,
            content,
            title: data.title ?? "",
            date: data.date ?? "",
            category: data.category ?? "",
            tags: Array.isArray(data.tags) ? data.tags : [],
            excerpt: data.excerpt ?? "",
        };
    });
}

// Retorna o post mais recente com base no campo "date" do frontmatter.
// Espera formato reconhecido por new Date(), ex: "2026-01-10".

export function getLatestPost() {
    const posts = getAllPosts();
    if (posts.length === 0) return null;

    return [...posts].sort((a,b) => new Date(b.date) - new Date(a.date))[0];
}

// Retorna os "limit" posts seguintes ao mais recente (que aparece no Hero),
// ordernados do mais novo pro mais antigo, sem repetir o primeiro.

export function getRecentPosts(limit = 4) {
    const posts = getAllPosts();
    const sorted = [...posts].sort((a,b) => new Date(b.date) - new Date(a.date));

    return sorted.slice(1, 1 + limit);
}

// Retorna todas as tags usadas nos posts, sem repetição, com a contagem de
// posts em que cada uma aparece.
// Útil para alimentar a nuvem de tags na sidebar.

export function getAllTags() {
    const posts = getAllPosts();
    const counts = new Map();

    posts.forEach((post) => {
        (post.tags ?? []).forEach((tag) => {
            counts.set(tag, (counts.get(tag) ?? 0) + 1);
        });
    });

    return [...counts.entries()].map(([tag, count]) => ({ tag, count }));
}