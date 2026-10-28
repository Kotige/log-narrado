import { describe, expect, it } from "vitest";
import { formatDate, parseDate } from "./date";

describe("formatDate", () => {
  it("mantém o dia certo independente do fuso", () => {
    // Antes, no fuso de Brasília, isso virava "09 de agosto de 2026".
    expect(formatDate("2026-08-10")).toBe("10 de agosto de 2026");
  });

  it("devolve o texto original quando a data é inválida", () => {
    expect(formatDate("em breve")).toBe("em breve");
    expect(formatDate("")).toBe("");
    expect(formatDate(undefined)).toBe("");
  });
});

describe("parseDate", () => {
  it("monta a data no fuso local", () => {
    const date = parseDate("2026-01-31");
    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([
      2026, 0, 31,
    ]);
  });
});
