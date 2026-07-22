import Container from "../Container";
import SectionTitle from "../SectionTitle";
import TimelineItem from "./TimelineItem";
import { timelineItems } from "../../data/timeline";

/**
 * Timeline
 * Experiencia laboral, educación formal y diplomados en una línea vertical
 * cronológica (el orden aquí sí es información real, a diferencia de un
 * numerado decorativo).
 */
const Timeline = () => {
  return (
    <section id="experiencia" className="py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <SectionTitle
          eyebrow="experience"
          title="How I got here"
          description="Work experience, formal education, and certifications that shaped my approach to building software."
        />

        <ul className="max-w-2xl">
          {timelineItems.map((item, index) => (
            <TimelineItem
              key={item.id}
              {...item}
              isLast={index === timelineItems.length - 1}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Timeline;
