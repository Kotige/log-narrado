import { FaBookOpen, FaCompress } from "react-icons/fa";

const THEMES = [
  { id: "light", label: "Claro", swatch: "#fbfaf6" },
  { id: "sepia", label: "Sépia", swatch: "#f4ecd8" },
  { id: "dark", label: "Escuro", swatch: "#1f1e1c" },
];

export default function ReadingControls({
  focusMode,
  onToggleFocusMode,
  fontSize,
  onFontSizeChange,
  theme,
  onThemeChange,
  accentColor,
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {focusMode && (
        <div
          className="flex items-center gap-3 rounded-full border bg-neutral-300/90 px-4 py-2 shadow-sm backdrop-blur-sm"
          style={{ borderColor: "currentColor", opacity: 0.95 }}
        >
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Diminuir fonte"
              onClick={() => onFontSizeChange(Math.max(16, fontSize - 2))}
              className="flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium"
              style={{ borderColor: "currentColor" }}
            >
              A-
            </button>
            <button
              type="button"
              aria-label="Aumentar fonte"
              onClick={() => onFontSizeChange(Math.min(26, fontSize + 2))}
              className="flex h-7 w-7 items-center justify-center rounded-full border text-sm font-medium"
              style={{ borderColor: "currentColor" }}
            >
              A+
            </button>
          </div>

          <div
            className="flex items-center gap-1.5 border-l pl-3"
            style={{ borderColor: "currentColor" }}
          >
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Tema ${t.label}`}
                onClick={() => onThemeChange(t.id)}
                className="h-5 w-5 rounded-full border-2 transition-transform"
                style={{
                  backgroundColor: t.swatch,
                  borderColor: theme === t.id ? accentColor : "transparent",
                  transform: theme === t.id ? "scale(1.15)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onToggleFocusMode}
        aria-label={
          focusMode ? "Sair do modo leitura" : "Entrar no modo leitura"
        }
        className="flex h-12 w-12 items-center justify-center rounded-full border shadow-sm transition-transform hover:scale-105"
        style={{ borderColor: "currentColor", backgroundColor: accentColor }}
      >
        {focusMode ? (
          <FaCompress size={16} className="text-bg" />
        ) : (
          <FaBookOpen size={18} className="text-bg" />
        )}
      </button>
    </div>
  );
}
