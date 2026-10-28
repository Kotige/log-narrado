// Cor de destaque das páginas de leitura. Espelha o token --color-terracota
// do index.css; fica aqui porque é usada em estilos inline.
export const ACCENT_COLOR = "#c76b3f";

// `strong` é a cor do negrito: o moss-dark do tema claro some no fundo escuro.
export const READING_THEMES = {
  light: { label: "Claro", bg: "#fbfaf6", text: "#2b2a28", strong: "#435c46" },
  sepia: { label: "Sépia", bg: "#f4ecd8", text: "#5b4636", strong: "#435c46" },
  dark: { label: "Escuro", bg: "#1f1e1c", text: "#e8e6df", strong: "#a9c3a9" },
};

export const FONT_SIZE = { min: 16, max: 26, step: 2, default: 18 };
