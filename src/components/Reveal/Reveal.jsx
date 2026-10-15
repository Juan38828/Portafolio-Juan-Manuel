import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const clamp = (value) => Math.min(1, Math.max(0, value));

// Fracción de la altura de la pantalla que dura la transición de entrada/salida.
const ZONE = 0.4;

/**
 * Reveal
 * Hace emerger el contenido "desde las sombras" y lo devuelve a ellas al salir.
 * El efecto está atado a la posición del scroll (no a un evento de "entrar al
 * viewport"), así que es determinista: siempre se reproduce, al bajar y al
 * subir, sin importar la velocidad del scroll ni la altura de la sección.
 * Con movimiento reducido se muestra directamente.
 */
const Reveal = ({ children, className = "" }) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);

  const target = useMotionValue(0);
  const progress = useSpring(target, { stiffness: 70, damping: 20, mass: 0.6 });

  const opacity = useTransform(progress, (p) => clamp(p));
  const y = useTransform(progress, (p) => (1 - clamp(p)) * 56);
  const filter = useTransform(progress, (p) => {
    const v = clamp(p);
    return v > 0.995 ? "none" : `blur(${(1 - v) * 14}px) brightness(${0.3 + v * 0.7})`;
  });

  useEffect(() => {
    if (reduceMotion) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offset = y.get(); // evita el bucle de realimentación con el propio desplazamiento
      const top = rect.top - offset;
      const bottom = rect.bottom - offset;
      const vh = window.innerHeight;
      const entering = clamp((vh - top) / (vh * ZONE));
      const leaving = clamp(bottom / (vh * ZONE));
      target.set(Math.min(entering, leaving));    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduceMotion, target, y]);

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} style={{ opacity, y, filter }} className={className}>
      {children}
    </motion.div>
  );
};

export default Reveal;
