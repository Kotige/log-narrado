import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";

// `match` lista os prefixos de rota em que o item fica marcado como ativo.
const NAV_LINKS = [
  { label: "Home", href: "/", match: [] },
  { label: "Posts", href: "/posts", match: ["/posts"] },
  { label: "Projetos", href: "/projetos", match: ["/projetos", "/fabulario"] },
  { label: "Changelog", href: "/changelog", match: ["/changelog"] },
  { label: "Autor", href: "/autor", match: ["/autor"] },
];

function isActiveLink(link, pathname) {
  if (link.href === "/") return pathname === "/";
  return link.match.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const mobileNavRef = useRef(null);

  // Fecha o menu ao trocar de página. Ajustar o estado durante a renderização
  // (em vez de num efeito) evita um quadro com o menu ainda aberto.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  // Com o menu aberto: foco no primeiro link e Esc fecha, devolvendo o foco
  // para o botão.
  useEffect(() => {
    if (!menuOpen) return;

    mobileNavRef.current?.querySelector("a")?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:bg-bg focus:px-4 focus:py-2 focus:font-mono focus:text-[12px] focus:uppercase focus:tracking-[0.06em] focus:text-moss-dark focus:shadow-sm"
      >
        Pular para o conteúdo
      </a>

      <header className="sticky top-0 z-50 w-full overflow-x-clip bg-bg">
        <div className="flex w-full items-center justify-between gap-6 px-8 py-5.5">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 text-ink no-underline"
          >
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl text-moss-dark transition-colors duration-150 hover:text-moss">
                log narrado
              </span>
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9.5 w-9.5 items-center justify-center md:hidden"
          >
            {menuOpen ? <BiX size={32} /> : <BiMenu size={26} />}
          </button>

          {/* Nav — desktop */}
          <nav
            aria-label="Principal"
            className="hidden items-center gap-1 md:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = isActiveLink(link, pathname);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-[3px] px-5 py-2 text-sm no-underline transition-colors duration-150 hover:bg-sand hover:text-moss-dark ${
                    isActive ? "text-moss-dark" : "text-ink"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0.75 left-3.5 right-3.5 h-0.5 bg-terracota" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Nav — mobile */}
        <nav
          id="menu-mobile"
          ref={mobileNavRef}
          aria-label="Principal"
          inert={!menuOpen}
          className={`absolute right-0 top-full flex w-full max-w-xs flex-col bg-bg px-8 pb-5 pt-2 text-right shadow-sm transition-[transform,opacity] duration-500 ease-in-out md:hidden ${
            menuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = isActiveLink(link, pathname);
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`px-1.5 py-3 text-[14.5px] no-underline ${
                  isActive
                    ? "font-extrabold text-moss-dark"
                    : "font-medium text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-ink/10 backdrop-blur-sm transition-opacity duration-300 md:hidden"
        />
      )}
    </>
  );
}
