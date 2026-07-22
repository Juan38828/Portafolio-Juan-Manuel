import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import Container from "../Container";
import Button from "../Button";
import HeroPhoto from "./HeroPhoto";

const containerVariants = {
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Hero
 * Ocupa el alto completo de la pantalla. En desktop: texto a la izquierda,
 * foto a la derecha. En móvil: foto debajo del texto.
 */
const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-20"
    >
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 text-center md:text-left order-2 md:order-1"
        >
          <motion.span variants={itemVariants} className="font-mono text-2xl text-primary-soft">
            Hello! I'm
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-6xl lg:text-6xl font-semibold tracking-tight text-text"
          >
            Juan Manuel Franco Peña
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="font-mono text-lg sm:text-xl text-text-muted h-8"
          >
            <TypeAnimation
              sequence={[
                "Full-Stack Developer",
                2000,
                "Systems Engineer",
                2000,
                "Automation Developer",
                2000,
                "AI Developer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-text-muted text-base sm:text-lg leading-relaxed max-w-md mx-auto md:mx-0"
          >
           I build modern digital experiences through web development, automation, and artificial intelligence.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col xs:flex-row items-center gap-4 pt-2 justify-center md:justify-start"
          >
            <Button href="#proyectos" icon={FiArrowRight}>
              View projects
            </Button>
            <Button href="/CV_Juan_Manuel_Franco2.pdf" variant="outline" icon={FiDownload}>
              Download CV
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 md:order-2"
        >
          <HeroPhoto />
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
