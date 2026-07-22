import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * Card
 * Contenedor base con estilo glass/oscuro, borde sutil y hover elevado.
 * Se reutiliza en Skills, Projects y Certificates con distinto contenido interno.
 */
const Card = ({ children, className = "", hoverLift = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={hoverLift ? { y: -6 } : undefined}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-2xl border border-border bg-bg-elevated/60 backdrop-blur-sm p-6 sm:p-7 transition-shadow duration-300 hover:border-primary/40 hover:shadow-[0_8px_40px_-12px_rgba(59,130,246,0.35)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;
