import { useEffect, useState } from "react";

/**
 * useActiveSection
 * Observa las secciones dadas por id y devuelve cuál está actualmente visible,
 * para resaltar el enlace correspondiente en el Navbar.
 */
export function useActiveSection(sectionIds = [], options = { threshold: 0.4 }) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { threshold: options.threshold }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, options.threshold]);

  return activeId;
}
