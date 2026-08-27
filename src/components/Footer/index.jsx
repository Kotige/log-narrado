import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiInstagram, FiRss } from "react-icons/fi";

const NAV_LINKS = [
  { label: "Posts", to: "/posts" },
  { label: "Projetos", to: "/projetos" },
  { label: "Changelog", to: "/changelog" },
  { label: "Author", to: "/autor" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Kotige", icon: FiGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vitorbarra",
    icon: FiLinkedin,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/lognarrado",
    icon: FiInstagram,
  },
  { label: "RSS", href: "/rss.xml", icon: FiRss },
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
              <span>Log Narrado</span>
            </Link>
            <p className="mt-3 text-sm text-muted max-w-xs leading-relaxed">
              Ciência, tecnologia e experiências pessoais, registrada com alguma
              regularidade.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4">
              Navegação
            </p>
            <nav className="flex flex-col gap-2.5">
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

          {/* Redes e RSS */}

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4">
              Conecte-se
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopner noreferrer" : undefined
                  }
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-sand-line text-muted hover:text-moss-dark hover:border-moss transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Linha inferior */}
        <div className="mt-10 pt-6 border-t border-sand-line flex flex-col-reverse md:flex-row items-center justify-center gap-3">
          <p className="font-mono text-xs text-muted">
            © {year} Log Narrado. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
