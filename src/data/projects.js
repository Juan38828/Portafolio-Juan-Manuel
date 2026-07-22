/**
 * Reemplaza con tus proyectos reales. Deja `image: null` si aún no tienes
 * una captura — la tarjeta usa un fallback con gradiente + iniciales.
 * Para usar imagen real: coloca el archivo en /src/assets/images y
 * haz `import miProyecto from "../assets/images/mi-proyecto.jpg"`.
 */
import signLanguageProject from "../assets/images/proyecto-lenguaje-senas.webp";

export const projects = [
  {
    id: "reconocimiento-lenguaje-senas",
    title: "Sign Language Recognition",
    description:
      "Real-time recognition system for the Colombian Sign Language (LSC) alphabet using computer vision and artificial intelligence.",
    image: signLanguageProject,
    technologies: ["Python", "OpenCV", "MediaPipe", "Machine Learning"],
    githubUrl: "#",
    demoUrl: "#",
  },
];
