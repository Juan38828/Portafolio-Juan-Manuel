import { motion } from "framer-motion";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

/**
 * ProjectCard
 * Imagen (o fallback con gradiente + iniciales si `image` es null) + título,
 * descripción, chips de tecnologías y enlaces a GitHub / demo en vivo.
 */
const ProjectCard = ({ title, description, image, technologies, githubUrl, demoUrl }) => {
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-2xl border border-border bg-bg-elevated/60 overflow-hidden transition-shadow duration-300 hover:border-primary/40 hover:shadow-[0_8px_40px_-12px_rgba(59,130,246,0.35)]"
    >
      <div className="relative aspect-video overflow-hidden bg-bg-soft">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-glow">
            <span className="font-display text-4xl font-semibold text-text-subtle">
              {initials}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 p-6 flex-1">
        <h3 className="font-display text-lg font-semibold text-text">{title}</h3>
        <p className="text-sm text-text-muted leading-relaxed flex-1">{description}</p>

        <ul className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="font-mono text-xs text-primary-soft border border-primary/25 bg-primary/5 rounded-full px-2.5 py-1"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5 pt-1">
          <a
            href={githubUrl}
            target={githubUrl.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={`Repositorio de ${title} en GitHub`}
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
          >
            <FaGithub aria-hidden="true" /> Código
          </a>
          <a
            href={demoUrl}
            target={demoUrl.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={`Demo en vivo de ${title}`}
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary-soft transition-colors"
          >
            <FaArrowUpRightFromSquare aria-hidden="true" /> Demo
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
