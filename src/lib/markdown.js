export function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

    if (!match) {
        return { data: {}, content: raw };
    }

    const [, frontmatterBlock, content] = match;
    const data = {};

    for (const line of frontmatterBlock.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const separatorIndex = trimmed.indexOf(':');
        if (separatorIndex === -1) continue;

        const key = trimmed.slice(0, separatorIndex).trim();
        let value = trimmed.slice(separatorIndex + 1).trim();

        value = value.replace(/^["']|["']$/g, '');

        data[key] = value;
    }

    return { data, content: content.trim() };
}