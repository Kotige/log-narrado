import { useEffect, useState } from "react";
import { getReadingProgress } from "../../lib/readingProgress";

export default function ReadingProgressBar({ articleRef, accentColor }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = null;

    // Um cálculo por quadro, no máximo, mesmo com muitos eventos de rolagem.
    function handleScroll() {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        if (articleRef.current) {
          setProgress(getReadingProgress(articleRef.current));
        }
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [articleRef]);

  // Decorativa: o leitor de tela já sabe onde está no texto.
  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 h-0.75 w-full bg-transparent"
    >
      <div
        className="h-full origin-left transition-transform duration-150 ease-out"
        style={{
          transform: `scaleX(${progress})`,
          backgroundColor: accentColor,
        }}
      />
    </div>
  );
}
