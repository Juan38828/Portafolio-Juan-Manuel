import { motion } from "framer-motion";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
};

const linkListVariants = {
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const linkVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

/**
 * MobileMenu
 * Panel deslizante desde la derecha con overlay. Cierra al hacer click en un link
 * o en el overlay, y bloquea el scroll del body mientras está abierto (ver Navbar).
 */
const MobileMenu = ({ links, activeId, onNavigate }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 z-40 md:hidden"
    >
      <motion.button
        variants={overlayVariants}
        transition={{ duration: 0.3 }}
        onClick={onNavigate}
        aria-label="Cerrar menú"
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
      />

      <motion.nav
        variants={panelVariants}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Navegación móvil"
        className="absolute right-0 top-0 h-full w-[78%] max-w-xs glass border-l border-border flex flex-col justify-center px-8"
      >
        <motion.ul
          variants={linkListVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {links.map((link) => (
            <motion.li key={link.id} variants={linkVariants}>
              <a
                href={`#${link.id}`}
                onClick={onNavigate}
                className={`font-display text-xl transition-colors ${
                  activeId === link.id
                    ? "text-primary-soft"
                    : "text-text hover:text-primary-soft"
                }`}
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>
    </motion.div>
  );
};

export default MobileMenu;
