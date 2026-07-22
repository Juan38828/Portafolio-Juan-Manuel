import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa6";
import { socials } from "../../data/socials";

const links = [
  { key: "github", href: socials.github, label: "GitHub", Icon: FaGithub },
  { key: "linkedin", href: socials.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  {
    key: "email",
    href: `mailto:${socials.email}`,
    label: "Correo",
    Icon: FaEnvelope,
  },
  { key: "whatsapp", href: socials.whatsapp, label: "WhatsApp", Icon: FaWhatsapp },
];

/**
 * SocialLinks
 * Lista de íconos de redes sociales, reutilizada en Contact y Footer.
 * `size` controla el tamaño del ícono ("sm" para el footer, "md" por defecto).
 */
const SocialLinks = ({ size = "md", className = "" }) => {
  const iconSize = size === "sm" ? "text-lg" : "text-xl";

  return (
    <ul className={`flex items-center gap-5 ${className}`}>
      {links.map(({ key, href, label, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            className={`text-text-muted hover:text-primary-soft transition-colors ${iconSize}`}
          >
            <Icon aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
