import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaAward } from "react-icons/fa6";

const iconByType = {
  work: FaBriefcase,
  education: FaGraduationCap,
  diploma: FaAward,
};

/**
 * TimelineItem
 * Un punto en la línea vertical con ícono según el tipo (trabajo, educación,
 * diplomado), rol, organización, periodo y descripción.
 */
const TimelineItem = ({ type, role, organization, period, description, isLast }) => {
  const Icon = iconByType[type] ?? FaBriefcase;

  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6 pl-2"
    >
      <div className="flex flex-col items-center">
        <span className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/40 bg-bg-elevated text-primary-soft shrink-0">
          <Icon className="text-base" aria-hidden="true" />
        </span>
        {!isLast && <span className="w-px flex-1 bg-border mt-2" aria-hidden="true" />}
      </div>

      <div className="pb-12">
        <span className="font-mono text-xs text-text-subtle">{period}</span>
        <h3 className="font-display text-lg font-semibold text-text mt-1">{role}</h3>
        <p className="text-sm text-primary-soft mt-0.5">{organization}</p>
        <p className="text-sm text-text-muted leading-relaxed mt-3 max-w-xl">
          {description}
        </p>
      </div>
    </motion.li>
  );
};

export default TimelineItem;
