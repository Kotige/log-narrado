import { Link } from "react-router-dom";
import SocialIcon from "../SocialIcon";
import { SITE_DESCRIPTION, SITE_NAME, SOCIAL_LINKS } from "../../data/site";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Posts", to: "/posts" },
  { label: "Projetos", to: "/projetos" },
  { label: "Changelog", to: "/changelog" },
  { label: "Autor", to: "/autor" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sand-line bg-bg">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10 md:gap-6">
          {/* Logo */}
          <div>
            <Link
              to="/"
              className="inline-flex items-baseline gap-1 font-display text-2xl text-ink hover:text-moss-dark transition-colors"
            >
              <span>{SITE_NAME}</span>
            </Link>
            <p className="mt-3 text-sm text-muted max-w-xs leading-relaxed">
              {SITE_DESCRIPTION}
            </p>
          </div>

          {/* Navegação */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4">
              Navegação
            </p>
            <nav aria-label="Rodapé" className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-ink hover:text-moss-dark transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Redes */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4">
              Conecte-se
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ id, label, href }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-sand-line text-muted hover:text-moss-dark hover:border-moss transition-colors"
                >
                  <SocialIcon id={id} />
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Linha inferior */}
        <div className="mt-10 pt-6 border-t border-sand-line flex flex-col-reverse md:flex-row items-center justify-center gap-3">
          <p className="font-mono text-xs text-muted">
            © {year} {SITE_NAME}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
