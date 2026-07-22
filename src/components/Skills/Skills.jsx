import Container from "../Container";
import SectionTitle from "../SectionTitle";
import SkillCard from "./SkillCard";
import { skillCategories } from "../../data/skills";

/**
 * Skills
 * Grilla de tarjetas por categoría (Frontend, Backend, Bases de datos,
 * Cloud, IA, Herramientas), cada una con sus tecnologías e íconos.
 */
const Skills = () => {
  return (
    <section id="habilidades" className="py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <SectionTitle
          eyebrow="Skills"
          title="What tools do I work with?"
          description="A thoughtfully curated stack for bringing ideas from interface to automation and the intelligence behind them."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <SkillCard key={category.id} title={category.title} skills={category.skills} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Skills;
