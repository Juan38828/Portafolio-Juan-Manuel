import Container from "../Container";
import SectionTitle from "../SectionTitle";
import ProjectCard from "./ProjectCard";
import { projects } from "../../data/projects";

/**
 * Projects
 * Grilla de proyectos con imagen, tecnologías, descripción y enlaces.
 */
const Projects = () => {
  return (
    <section id="proyectos" className="py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <SectionTitle
          eyebrow="Projects"
          title="Things I have built"
          description="A selection of projects where web development meets automation and artificial intelligence."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Projects;
