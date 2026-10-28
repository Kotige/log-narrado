// Progresso de 0 a 1 dentro do elemento: chega a 1 quando o texto termina,
// não quando a página (que pode ter espaço extra) termina.
export function getReadingProgress(element) {
  const rect = element.getBoundingClientRect();
  const articleHeight = rect.height - window.innerHeight;

  if (articleHeight <= 0) return 1;
  return Math.min(1, Math.max(0, -rect.top / articleHeight));
}

// Posição de rolagem (scrollY) que corresponde a um progresso de 0 a 1.
export function getScrollTopForProgress(element, progress) {
  const rect = element.getBoundingClientRect();
  const articleTop = rect.top + window.scrollY;
  const articleHeight = Math.max(0, rect.height - window.innerHeight);

  return articleTop + articleHeight * progress;
}
