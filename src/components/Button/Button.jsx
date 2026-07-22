import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-soft shadow-[0_0_0_1px_rgba(59,130,246,0.4)] hover:shadow-[0_0_24px_rgba(59,130,246,0.45)]",
  outline:
    "bg-transparent text-text border border-border hover:border-primary hover:text-primary-soft",
  ghost: "bg-transparent text-text-muted hover:text-text",
};

/**
 * Button
 * Botón reutilizable con variantes visuales y micro-interacción de hover/tap.
 * Renderiza <a> si recibe `href`, o <button> en caso contrario.
 */
const Button = ({
  children,
  variant = "primary",
  icon: Icon,
  href,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
}) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        className={classes}
        {...motionProps}
      >
        {children}
        {Icon && <Icon className="text-base" aria-hidden="true" />}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      {...motionProps}
    >
      {children}
      {Icon && <Icon className="text-base" aria-hidden="true" />}
    </motion.button>
  );
};

export default Button;
