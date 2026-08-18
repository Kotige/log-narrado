import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { href } from "react-router-dom";

const social_links = [
    {label: "LinkedIn", href: "https://www.linkedin.com/in/vitorbarra", Icon: FaLinkedin},
    {label: "Instagram", href: "ttps://instagram.com/lognarrado", Icon: FaInstagram},
    {label: "GitHub", href: "https://github.com/Kotige", Icon: FaGithub},
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