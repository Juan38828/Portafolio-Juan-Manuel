import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { FiCheck } from "react-icons/fi";

const variants = {
  primary:
    "bg-primary text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4)] hover:shadow-[0_0_32px_rgba(59,130,246,0.55)]",
  outline:
    "bg-transparent text-text border border-border hover:border-primary hover:text-primary-soft hover:shadow-[0_0_28px_rgba(59,130,246,0.25)]",
  ghost: "bg-transparent text-text-muted hover:text-text",
};

const MAGNET_STRENGTH = 0.28;

/**
 * Button
 * Botón con tres efectos "exóticos":
 *  - Imán: se desplaza suavemente hacia el cursor al acercarse.
 *  - Destello: una franja de luz cruza el botón al pasar el cursor.
 *  - Clic: onda expansiva desde el punto de clic. Si recibe `download`, además
 *    se llena como barra de progreso y el ícono se transforma en un check.
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
  download,
  doneLabel = "Done!",
}) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const timers = useRef([]);
  const [ripples, setRipples] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | done

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const handleMove = (event) => {
    if (reduceMotion || event.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * MAGNET_STRENGTH);
    y.set((event.clientY - (rect.top + rect.height / 2)) * MAGNET_STRENGTH);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const schedule = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  const handleClick = (event) => {
    if (!reduceMotion && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const id = Date.now() + Math.random();
      setRipples((prev) => [
        ...prev,
        { id, x: event.clientX - rect.left, y: event.clientY - rect.top, size: Math.max(rect.width, rect.height) * 2.4 },
      ]);
      schedule(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 800);
    }

    if (download && status === "idle") {
      setStatus("loading");
      schedule(() => setStatus("done"), reduceMotion ? 0 : 1100);
      schedule(() => setStatus("idle"), reduceMotion ? 1500 : 3200);
    }

    onClick?.(event);
  };

  const isDone = status === "done";
  const isLoading = status === "loading";

  const classes = `group relative inline-flex items-center justify-center gap-2 min-h-11 overflow-hidden rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-[color,border-color,background-color,box-shadow] duration-300 ${variants[variant]} ${className}`;

  const content = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 bg-linear-to-r from-primary via-primary-soft to-accent-violet opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      {!reduceMotion && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-20 bg-white/25 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[460%]"
        />
      )}

      {download && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 origin-left bg-white/25"
          initial={false}
          animate={{ scaleX: isLoading ? 1 : isDone ? 1 : 0, opacity: isDone ? 0 : 1 }}
          transition={{ duration: isLoading ? 1.1 : 0.5, ease: "easeInOut" }}
        />
      )}

      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-white/35"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        />
      ))}

      <span className="relative z-10 inline-flex items-center gap-2" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDone ? "done" : "label"}
            initial={reduceMotion ? false : { y: 14, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={reduceMotion ? undefined : { y: -14, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
          >
            {isDone ? doneLabel : children}
          </motion.span>
        </AnimatePresence>

        {Icon && (
          <span className="relative inline-flex size-4 items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {isDone ? (
                <motion.span
                  key="check"
                  initial={reduceMotion ? false : { scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 16 }}
                  className="inline-flex"
                >
                  <FiCheck className="text-base" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="icon"
                  className={`inline-flex transition-transform duration-300 ${
                    download
                      ? "group-hover:animate-[icon-drop_0.9s_ease-in-out_infinite]"
                      : "group-hover:translate-x-1"
                  }`}
                  animate={isLoading ? { y: [0, 18, -18, 0], opacity: [1, 0, 0, 1] } : { y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <Icon className="text-base" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        )}
      </span>
    </>
  );

  const motionProps = {
    ref,
    style: { x: springX, y: springY },
    onPointerMove: handleMove,
    onPointerLeave: handleLeave,
    onClick: handleClick,
    whileTap: { scale: 0.94 },
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        download={download ? "" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        className={classes}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} aria-label={ariaLabel} className={classes} {...motionProps}>
      {content}
    </motion.button>
  );
};

export default Button;
