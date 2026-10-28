import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "./markdown";

describe("parseFrontmatter", () => {
  it("lê pares chave: valor e separa o conteúdo", () => {
    const { data, content } = parseFrontmatter(
      "---\ntitle: Olá\ndate: 2026-08-10\n---\n\nTexto **aqui**.\n",
    );

    expect(data).toEqual({ title: "Olá", date: "2026-08-10" });
    expect(content).toBe("Texto **aqui**.");
  });

  it("entende listas, booleanos e aspas", () => {
    const { data } = parseFrontmatter(
      '---\ntags: [física, "memória", tempo]\ndraft: true\ntitle: "Um: título"\n---\n',
    );

    expect(data.tags).toEqual(["física", "memória", "tempo"]);
    expect(data.draft).toBe(true);
    expect(data.title).toBe("Um: título");
  });

  it("não remove aspas desemparelhadas", () => {
    const { data } = parseFrontmatter('---\nexcerpt: "ele disse\n---\n');
    expect(data.excerpt).toBe('"ele disse');
  });

  it("aceita valores vazios e quebras de linha do Windows", () => {
    const { data } = parseFrontmatter(
      "---\r\ncover:\r\ntitle: X\r\n---\r\nCorpo",
    );
    expect(data).toEqual({ cover: "", title: "X" });
  });

  it("devolve o texto inteiro quando não há frontmatter", () => {
    expect(parseFrontmatter("Só texto")).toEqual({
      data: {},
      content: "Só texto",
    });
  });
});
