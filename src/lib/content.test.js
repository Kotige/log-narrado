import { describe, expect, it } from "vitest";
import { buildContos, buildPosts, estimateReadingTime } from "./content";

function file(slug, frontmatter, body = "Texto.") {
  return [
    `/src/content/posts/${slug}.md`,
    `---\n${frontmatter}\n---\n\n${body}`,
  ];
}

describe("buildPosts", () => {
  const files = [
    file("b", "title: B\ndate: 2026-08-10"),
    file("a", "title: A\ndate: 2026-08-10"),
    file("novo", "title: Novo\ndate: 2026-09-01"),
    file("rascunho", "title: Rascunho\ndate: 2026-10-01\ndraft: true"),
  ];

  it("ordena do mais recente ao mais antigo, desempatando pelo slug", () => {
    expect(buildPosts(files).map((post) => post.slug)).toEqual([
      "novo",
      "a",
      "b",
    ]);
  });

  it("numera os posts em ordem cronológica", () => {
    const numbers = Object.fromEntries(
      buildPosts(files).map((post) => [post.slug, post.entryNumber]),
    );
    expect(numbers).toEqual({ b: 1, a: 2, novo: 3 });
  });

  it("esconde rascunhos, a não ser que sejam pedidos", () => {
    expect(buildPosts(files).some((post) => post.draft)).toBe(false);
    expect(buildPosts(files, { includeDrafts: true })[0].slug).toBe("rascunho");
  });

  it("ignora modelos (arquivos que começam com _)", () => {
    const slugs = buildPosts(
      [...files, file("_modelo", "title: M\ndate: 2026-12-01")],
      {
        includeDrafts: true,
      },
    ).map((post) => post.slug);
    expect(slugs).not.toContain("_modelo");
  });

  it("preenche valores padrão", () => {
    const [post] = buildPosts([file("x", "date: 2026-01-01")]);
    expect(post).toMatchObject({ title: "Sem título", tags: [], excerpt: "" });
  });
});

describe("buildContos", () => {
  it("lê série e parte de campos separados", () => {
    const [conto] = buildContos([
      file("c", "title: C\ndate: 2026-01-01\nseries: Cidadelas\npart: 2"),
    ]);
    expect(conto).toMatchObject({ series: "Cidadelas", part: "2" });
  });
});

describe("estimateReadingTime", () => {
  it("usa 200 palavras por minuto, com mínimo de 1", () => {
    expect(estimateReadingTime("uma palavra")).toBe(1);
    expect(estimateReadingTime("palavra ".repeat(1000))).toBe(5);
  });
});
