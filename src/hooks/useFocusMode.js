import { useEffect, useState } from "react";

function isTypingTarget(target) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

// Modo leitura com atalhos de teclado: L alterna, Esc sempre sai.
// Os atalhos são ignorados enquanto o leitor digita em algum campo.
export default function useFocusMode() {
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (isTypingTarget(event.target)) return;

      if (event.key === "Escape") {
        setFocusMode(false);
        return;
      }

      if (
        event.key.toLowerCase() === "l" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.repeat
      ) {
        setFocusMode((current) => !current);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return [focusMode, setFocusMode];
}
