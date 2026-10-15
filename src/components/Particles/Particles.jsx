import { useEffect, useRef } from "react";

const STAR_COLORS = [
  [255, 255, 255],
  [191, 219, 254],
  [96, 165, 250],
  [196, 181, 253],
];

/**
 * Particles
 * Cielo estrellado fijo a la pantalla: la cantidad se adapta al área visible,
 * cada estrella parpadea a su ritmo y las más grandes llevan un halo suave.
 * Se detiene si la pestaña está oculta y queda estático con movimiento reducido.
 */
const Particles = ({ density = 7000, className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrame;
    let stars = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createStars = () => {
      const count = Math.min(260, Math.round((width * height) / density));
      stars = Array.from({ length: count }, () => {
        const big = Math.random() < 0.12;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: big ? Math.random() * 1.2 + 1.3 : Math.random() * 0.9 + 0.35,
          big,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          base: Math.random() * 0.4 + 0.35,
          twinkle: Math.random() * 0.35 + 0.15,
          speed: Math.random() * 0.0015 + 0.0006,
          phase: Math.random() * Math.PI * 2,
          drift: Math.random() * 0.06 + 0.01,
        };
      });
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        const flicker = prefersReducedMotion ? 0 : Math.sin(time * s.speed + s.phase);
        const alpha = Math.max(0.08, Math.min(1, s.base + flicker * s.twinkle));
        const [r, g, b] = s.color;

        if (s.big) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.45})`);
          glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = glow;
          ctx.fillRect(s.x - s.r * 5, s.y - s.r * 5, s.r * 10, s.r * 10);
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        if (!prefersReducedMotion) {
          s.y -= s.drift;
          if (s.y < -6) {
            s.y = height + 6;
            s.x = Math.random() * width;
          }
        }
      }

      if (!prefersReducedMotion) animationFrame = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      createStars();
      if (prefersReducedMotion) start();
    };

    const handleVisibility = () => {
      if (prefersReducedMotion) return;
      if (document.hidden) cancelAnimationFrame(animationFrame);
      else start();
    };

    resize();
    createStars();
    start();

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};

export default Particles;
