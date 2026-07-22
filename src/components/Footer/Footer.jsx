import Container from "../Container";
import SocialLinks from "../Contact/SocialLinks";

/**
 * Footer
 * Minimalista: nombre, redes sociales y copyright con el año actual calculado.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="font-display text-sm text-text-muted">
          Juan Manuel Franco
        </span>

        <SocialLinks size="sm" />

        <span className="text-xs text-text-subtle font-mono">
          © {year} — Todos los derechos reservados
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
