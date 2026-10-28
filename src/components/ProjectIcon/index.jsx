import { FaChartBar, FaFeatherAlt, FaLaptopCode } from "react-icons/fa";

const ICONS = {
  "web-dev": FaLaptopCode,
  "data-science": FaChartBar,
  fabulario: FaFeatherAlt,
};

export default function ProjectIcon({ slug, size = 26, className = "" }) {
  const Icon = ICONS[slug];
  return Icon ? (
    <Icon size={size} className={className} aria-hidden="true" />
  ) : null;
}
