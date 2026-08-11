import { useState } from "react";
import { BiMenu } from "react-icons/bi";

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
        <header className="sticky top-0 z-50 w-full border-b border-sand-line bg-bg">
        <div className="flex w-full items-center justify-between gap-6 px-8 py-[22px]">
            {/* Logo */}
            <a href="/" className="group flex items-center gap-3 text-ink no-underline">
            <span className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center border border-ink bg-ink font-display text-[18px] font-medium tracking-wide text-bg transition-colors duration-150 group-hover:bg-terracotta group-hover:border-terracotta">
                ln
            </span>
            <span className="flex flex-col leading-none">
                <span className="font-display text-[22px] tracking-wide">
                Log Narrado
                </span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                Uma frase curta e legal.
                </span>
            </span>
            </a>

            {/* Mobile toggle */}
            <button
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-[38px] w-[38px] items-center justify-center md:hidden"
            >
                <BiMenu size={26} />
            </button>

            {/* Nav — desktop */}
            <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
                const isActive = link.href === activeHref;
                return (
                <a
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-[3px] px-3.5 py-2 text-[14.5px] font-medium no-underline transition-colors duration-150 hover:bg-sand hover:text-moss-dark ${
                    isActive ? "text-moss-dark" : "text-ink"
                    }`}
                >
                    {link.label}
                    {isActive && (
                    <span className="absolute bottom-[3px] left-3.5 right-3.5 h-[2px] bg-terracotta" />
                    )}
                </a>
                );
            })}
            </nav>
        </div>

        {/* Nav — mobile */}
        {menuOpen && (
            <nav className="absolute left-0 right-0 top-full flex flex-col border-b border-sand-line bg-bg px-8 pb-5 pt-2 md:hidden">
            {NAV_LINKS.map((link, i) => {
                const isActive = link.href === activeHref;
                return (
                <a
                    key={link.href}
                    href={link.href}
                    className={`border-sand-line px-1.5 py-3 text-[14.5px] font-medium no-underline ${
                    i !== NAV_LINKS.length - 1 ? "border-b" : ""
                    } ${isActive ? "text-moss-dark" : "text-ink"}`}
                >
                    {link.label}
                </a>
                );
            })}
            </nav>
        )}
        </header>
    );
}