// Roda antes do deploy: os textos não ficam no repositório, então um clone
// novo tem só os modelos. Publicar assim apagaria o conteúdo do site.
import { readdir } from "node:fs/promises";

const dir = new URL("../src/content/posts/", import.meta.url);
const posts = (await readdir(dir)).filter(
  (file) => file.endsWith(".md") && !file.startsWith("_"),
);

if (posts.length === 0) {
  console.error(
    "Nenhum post em src/content/posts/ — o deploy publicaria o site vazio.\n" +
      "Os textos ficam só no seu computador; copie-os para src/content/ antes de publicar.",
  );
  process.exit(1);
}

console.log(`Conteúdo encontrado: ${posts.length} post(s).`);
