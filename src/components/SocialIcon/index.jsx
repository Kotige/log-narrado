import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";

const ICONS = {
  github: FiGithub,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
};

export default function SocialIcon({ id, size = 16 }) {
  const Icon = ICONS[id];
  return Icon ? <Icon size={size} aria-hidden="true" /> : null;
}
