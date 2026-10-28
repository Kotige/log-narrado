// Datas do frontmatter vêm no formato "AAAA-MM-DD". `new Date("2026-08-10")`
// interpreta isso como meia-noite UTC, o que no Brasil (UTC−3) vira o dia
// anterior. Por isso a data é montada à mão, no fuso local.
export function parseDate(dateStr) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr ?? "");
  if (!match) return null;

  const [, year, month, day] = match.map(Number);
  return new Date(year, month - 1, day);
}

// "2026-08-10" → "10 de agosto de 2026". Se a data for inválida, devolve o
// texto original para não sumir com a informação.
export function formatDate(dateStr) {
  const date = parseDate(dateStr);
  if (!date) return dateStr ?? "";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
