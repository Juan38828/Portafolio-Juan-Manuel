import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import Container from "../Container";
import MobileMenu from "./MobileMenu";
import { useActiveSection } from "../../hooks/useActiveSection";
import { navLinks } from "../../data/socials";

/**
 * Navbar
 * Fija en la parte superior con efecto glass. En desktop muestra los enlaces
 * en línea; en móvil, un botón hamburguesa abre el MobileMenu.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(navLinks.map((link) => link.id));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between h-18 py-4">
        <a
          href="#inicio"
          className="font-display text-lg font-semibold tracking-tight text-text"
        >
          Juan Franco
        </a>

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`relative text-sm font-medium transition-colors ${
                    activeId === link.id
                      ? "text-primary-soft"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                  {activeId === link.id && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-primary-soft"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
          className="md:hidden text-text text-2xl p-1"
        >
          <HiMenu />
        </button>
      </Container>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu links={navLinks} activeId={activeId} onNavigate={closeMenu} />
        )}
      </AnimatePresence>

      {isMenuOpen && (
        <button
          onClick={closeMenu}
          aria-label="Cerrar menú"
          className="fixed top-4 right-6 z-50 text-2xl text-text md:hidden"
        >
          <HiX />
        </button>
      )}
    </header>
  );
};

export default Navbar;
