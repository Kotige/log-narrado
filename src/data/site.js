// Dados gerais do site. Também é lido no build (vite.config.js) para gerar
// sitemap, RSS e meta tags, então não importe componentes ou ícones aqui.

// Endereço público do blog, sem barra no final. Usado em links canônicos,
// Open Graph, sitemap e RSS — ajuste se o domínio mudar.
export const SITE_URL = "https://lognarrado.vercel.app";

export const SITE_NAME = "Log Narrado";
export const SITE_DESCRIPTION =
  "Ciência, tecnologia e experiências pessoais, registradas com alguma regularidade.";
export const SITE_LOCALE = "pt_BR";

// Imagem usada nas prévias de links (Open Graph) quando a página não tem capa.
export const DEFAULT_IMAGE = "/og-default.png";

export const AUTHOR = {
  name: "Vítor",
  avatar: "/profile.jpg",
  avatarAlt: "Foto de Vítor",
};

// O ícone de cada rede é escolhido no componente, pelo `id`.
export const SOCIAL_LINKS = [
  { id: "github", label: "GitHub", href: "https://github.com/Kotige" },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vitorbarra",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/lognarrado",
  },
];
