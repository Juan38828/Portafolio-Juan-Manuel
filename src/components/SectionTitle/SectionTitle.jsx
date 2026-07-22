import { motion } from "framer-motion";

/**
 * SectionTitle
 * El "eyebrow" imita un comentario de código (// etiqueta), coherente con el
 * perfil de desarrollador. El título principal usa la tipografía display.
 */
const SectionTitle = ({ eyebrow, title, description, align = "left" }) => {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-3 max-w-2xl ${alignment}`}
    >
      {eyebrow && (
        <span className="font-mono text-sm text-primary-soft">
          {"// "}
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      {description && (
        <p className="text-text-muted text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
