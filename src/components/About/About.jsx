import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import Container from "../Container";
import SectionTitle from "../SectionTitle";
import Button from "../Button";
import profilePhoto from "../../assets/images/profile.webp";
import { aboutContent } from "../../data/about";

const paragraphs = aboutContent.bio.split("\n\n");

/**
 * About
 * Foto pequeña + descripción de perfil + tecnologías clave + CV.
 * Reemplaza `profile-placeholder.svg` por la misma foto usada en el Hero
 * (o una variante), y edita el bio en /src/data/about.js.
 */
const About = () => {
  return (
    <section id="sobre-mi" className="py-24 md:py-32">
      <Container className="grid grid-cols-1 md:grid-cols-[minmax(0,280px)_1fr] gap-12 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto md:mx-0 w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border border-border shadow-xl"
        >
          <img
            src={profilePhoto}
            alt="Juan Manuel Franco"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 20%" }}
            loading="lazy"
          />
        </motion.div>

        <div className="flex flex-col gap-8">
          <SectionTitle eyebrow="About me" title="Who is building this?" />

          <div className="flex flex-col gap-4 text-text-muted text-base sm:text-lg leading-relaxed max-w-2xl">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <ul className="flex flex-wrap gap-2.5">
            {aboutContent.keyTechnologies.map((tech) => (
              <li
                key={tech}
                className="font-mono text-xs text-primary-soft border border-primary/25 bg-primary/5 rounded-full px-3 py-1.5"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div>
            <Button href="/CV_Juan_Manuel_Franco.pdf" variant="outline" icon={FiDownload}>
              Download CV
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
