import { FaBookOpen, FaCompress } from "react-icons/fa";
import { FONT_SIZE, READING_THEMES } from "../../lib/readingThemes";

const THEMES = Object.entries(READING_THEMES).map(([id, theme]) => ({
  id,
  label: theme.label,
  swatch: theme.bg,
}));

export default function ReadingControls({
  focusMode,
  onToggleFocusMode,
  fontSize,
  onFontSizeChange,
  theme,
  onThemeChange,
  accentColor,
}) {
  const canDecrease = fontSize > FONT_SIZE.min;
  const canIncrease = fontSize < FONT_SIZE.max;

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
              disabled={!canDecrease}
              onClick={() => onFontSizeChange(fontSize - FONT_SIZE.step)}
              className="flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium disabled:opacity-40"
              style={{ borderColor: "currentColor" }}
            >
              A-
            </button>
            <button
              type="button"
              aria-label="Aumentar fonte"
              disabled={!canIncrease}
              onClick={() => onFontSizeChange(fontSize + FONT_SIZE.step)}
              className="flex h-7 w-7 items-center justify-center rounded-full border text-sm font-medium disabled:opacity-40"
              style={{ borderColor: "currentColor" }}
            >
              A+
            </button>
          </div>

          <div
            role="group"
            aria-label="Tema de leitura"
            className="flex items-center gap-1.5 border-l pl-3"
            style={{ borderColor: "currentColor" }}
          >
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Tema ${t.label}`}
                aria-pressed={theme === t.id}
                title={`Tema ${t.label}`}
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
          focusMode
            ? "Sair do modo leitura (Esc)"
            : "Entrar no modo leitura (L)"
        }
        title={focusMode ? "Sair do modo leitura (Esc)" : "Modo leitura (L)"}
        className="flex h-12 w-12 items-center justify-center rounded-full border shadow-sm transition-transform motion-safe:hover:scale-105"
        style={{ borderColor: "currentColor", backgroundColor: accentColor }}
      >
        {focusMode ? (
          <FaCompress size={16} className="text-bg" aria-hidden="true" />
        ) : (
          <FaBookOpen size={18} className="text-bg" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
