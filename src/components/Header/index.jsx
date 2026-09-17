import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Posts", href: "/posts" },
  { label: "Projetos", href: "/projetos" },
  { label: "Changelog", href: "/changelog" },
  { label: "Autor", href: "/autor" },
];

export default function Header({ activeHref = "/" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-bg">
      <div className="flex w-full items-center justify-between gap-6 px-8 py-5.5">
        {/* Logo */}
        <a
          href="/"
          className="group flex items-center gap-3 text-ink no-underline"
        >
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl text-moss-dark transition-colors duration-150 hover:text-moss">
              log narrado
            </span>
          </span>
        </a>

        {/* Mobile toggle */}
        <button
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9.5 w-9.5 items-center justify-center md:hidden"
        >
          {menuOpen ? <BiX size={32} /> : <BiMenu size={26} />}
        </button>

        {/* Nav — desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === activeHref;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-[3px] px-5 py-2 text-sm  no-underline transition-colors duration-150 hover:bg-sand hover:text-moss-dark ${
                  isActive ? "text-moss-dark" : "text-ink"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0.75 left-3.5 right-3.5 h-0.5 bg-terracota" />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Nav — mobile */}
      <nav
        className={`flex flex-col overflow-hidden  bg-bg px-8 transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
          menuOpen
            ? "max-h-96 border-b-0 pb-5 pt-2 opacity-100"
            : "max-h-0 border-b-0 pb-0 pt-0 opacity-0"
        }`}
      >
        {NAV_LINKS.map((link, i) => {
          const isActive = link.href === activeHref;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`
                  px-1.5 py-3 text-[14.5px] font-medium no-underline
                  ${
                    i !== NAV_LINKS.lenth - 1 ? "border-b" : ""
                  } ${isActive ? "text-moss-dark" : "text-ink"}
                `}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
