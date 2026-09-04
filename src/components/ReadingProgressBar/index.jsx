import { useEffect, useState } from "react";

// Mede o progresso de rolagem dentro do elemento referenciado por articleRef,
// não da página inteira — assim a barra chega a 100% quando o conto termina,
// não quando a página (que pode ter espaço extra) termina.

export default function ReadingProgressBar({ articleRef, accentColor }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const el = articleRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const articleHeight = rect.height - window.innerHeight;

      if (articleHeight <= 0) {
        setProgress(100);
        return;
      }

      const scrolled = -rect.top;
      const pct = Math.min(100, Math.max(0, (scrolled / articleHeight) * 100));
      setProgress(pct);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [articleRef]);

  return (
    <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, backgroundColor: accentColor }}
      />
    </div>
  );
}
