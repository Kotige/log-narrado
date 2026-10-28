// Parser de frontmatter simples, sem dependências externas. É usado tanto no
// navegador quanto no build (vite.config.js), então não pode depender de nada
// específico do Vite ou do Node.
//
// Entende:
// - pares chave: valor de uma linha;
// - valores entre aspas simples ou duplas (só quando as aspas fecham);
// - listas em linha: tags: [física, "memória"];
// - booleanos: true / false.
// Não entende listas multilinha nem objetos aninhados.

function unquote(value) {
  const isQuoted =
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")));

  return isQuoted ? value.slice(1, -1) : value;
}

function parseValue(value) {
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => unquote(item.trim()))
      .filter(Boolean);
  }

  if (value === "true") return true;
  if (value === "false") return false;

  return unquote(value);
}

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: raw.trim() };
  }

  const [, frontmatterBlock, content] = match;
  const data = {};

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();

    data[key] = parseValue(value);
  }

  return { data, content: content.trim() };
}
