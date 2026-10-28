import { useEffect, useState } from "react";
import { FONT_SIZE, READING_THEMES } from "../lib/readingThemes";

// A mesma preferência vale para posts e contos. As chaves antigas (uma por
// tipo de página) ainda são lidas, para ninguém perder o que já escolheu.
const PREFS_KEY = "reading:prefs";
const LEGACY_KEYS = ["posts:reading-prefs", "fabulario:prefs"];

const DEFAULT_PREFS = { fontSize: FONT_SIZE.default, theme: "light" };

// Valida o que veio do localStorage: um tema renomeado ou um valor corrompido
// não pode derrubar a página.
function sanitize(prefs) {
  const fontSize = Number(prefs?.fontSize);
  const theme = prefs?.theme;

  return {
    fontSize: Number.isFinite(fontSize)
      ? Math.min(FONT_SIZE.max, Math.max(FONT_SIZE.min, Math.round(fontSize)))
      : DEFAULT_PREFS.fontSize,
    theme: Object.hasOwn(READING_THEMES, theme) ? theme : DEFAULT_PREFS.theme,
  };
}

function loadPrefs() {
  try {
    for (const key of [PREFS_KEY, ...LEGACY_KEYS]) {
      const raw = localStorage.getItem(key);
      if (raw) return sanitize(JSON.parse(raw));
    }
  } catch {
    // localStorage indisponível (modo privado, etc.) ou JSON inválido.
  }
  return DEFAULT_PREFS;
}

export default function useReadingPreferences() {
  const [prefs, setPrefs] = useState(loadPrefs);

  // Salva as preferências sempre que mudam.
  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {
      // ignora se não conseguir salvar
    }
  }, [prefs]);

  return {
    fontSize: prefs.fontSize,
    theme: prefs.theme,
    readingTheme: READING_THEMES[prefs.theme],
    setFontSize: (fontSize) => setPrefs((p) => sanitize({ ...p, fontSize })),
    setTheme: (theme) => setPrefs((p) => sanitize({ ...p, theme })),
  };
}
