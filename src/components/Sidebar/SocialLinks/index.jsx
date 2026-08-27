import { FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";
import { href } from "react-router-dom";

const social_links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vitorbarra",
    Icon: FiLinkedin,
  },
  {
    label: "Instagram",
    href: "ttps://instagram.com/lognarrado",
    Icon: FiInstagram,
  },
  { label: "GitHub", href: "https://github.com/Kotige", Icon: FiGithub },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4 border-t border-sand-line pt-5">
      {social_links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-ink transition-colors duration-150 hover:text-moss-dark"
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
}
