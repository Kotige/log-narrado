// Cores das páginas de leitura, usadas em estilos inline. O tema claro espelha
// os tokens do index.css; o escuro tem versões mais claras das mesmas cores,
// porque as do tema claro somem no fundo escuro.
// `strong` é a cor do negrito, `link` a dos links e `accent` a do destaque
// (categoria, barra de progresso, bordas de citação).
export const READING_THEMES = {
  light: {
    label: "Claro",
    bg: "#f8f7fa",
    text: "#26252b",
    strong: "#414a6c",
    link: "#58628a",
    accent: "#6f8a6b",
  },
  sepia: {
    label: "Sépia",
    bg: "#f4ecd8",
    text: "#5b4636",
    strong: "#414a6c",
    link: "#58628a",
    accent: "#6f8a6b",
  },
  dark: {
    label: "Escuro",
    bg: "#1c1b23",
    text: "#e7e5ee",
    strong: "#c5cbec",
    link: "#a3abd6",
    accent: "#9fbd9a",
  },
};

export const FONT_SIZE = { min: 16, max: 26, step: 2, default: 18 };
