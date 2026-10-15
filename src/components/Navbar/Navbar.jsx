import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
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
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    if (!isMenuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
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
                  aria-current={activeId === link.id ? "true" : undefined}
                  className={`relative inline-flex items-center min-h-11 text-sm font-medium transition-colors duration-200 ${
                    activeId === link.id
                      ? "text-primary-soft"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                  {activeId === link.id && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="absolute bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary-soft"
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
          className="md:hidden inline-flex items-center justify-center size-11 -mr-2 text-text text-2xl rounded-lg"
        >
          <HiMenu />
        </button>
      </Container>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute bottom-0 inset-x-0 h-0.5 origin-left bg-linear-to-r from-primary via-primary-soft to-accent-violet"
      />

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu links={navLinks} activeId={activeId} onNavigate={closeMenu} />
        )}
      </AnimatePresence>

      {isMenuOpen && (
        <button
          onClick={closeMenu}
          aria-label="Cerrar menú"
          className="fixed top-3 right-4 z-50 inline-flex items-center justify-center size-11 text-2xl text-text md:hidden"
        >
          <HiX />
        </button>
      )}
    </header>
  );
};

export default Navbar;
