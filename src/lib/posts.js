import { parseFrontmatter } from './markdown';

const postFiles = import.meta.glob('/src/content/posts/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
});

function slugFromPath(path) {
    return path.split('/').pop().replace(/\.md$/, '');
}

export const posts = Object.entries(postFiles)
    .map(([path, raw]) => {
        const { data, content } = parseFrontmatter(raw);
        return {
            slug: slugFromPath(path),
            title: data.title ?? 'Sem título',
            date: data.date ?? '',
            category: data.category ?? '',
            excerpt: data.excerpt ?? '',
            content,
        };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

export function getPostBySlug(slug) {
    return posts.find((post) => post.slug === slug);
}