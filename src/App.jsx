import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";

/**
 * App
 * Todas las secciones integradas: Navbar, Hero, About, Skills, Projects,
 * Timeline, Certificates, Contact y Footer, cada una en su propia carpeta
 * dentro de /components.
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />

      <div className="relative min-h-screen overflow-x-hidden bg-bg bg-glow">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Saltar al contenido
        </a>

        <Particles />

        <Navbar />

        <main id="main-content" className="relative z-10">
          <Hero />
          <Reveal>
            <About />
          </Reveal>
          <Reveal>
            <Skills />
          </Reveal>
          <Reveal>
            <Projects />
          </Reveal>
          <Reveal>
            <Timeline />
          </Reveal>
          <Reveal>
            <Certificates />
          </Reveal>
          <Reveal>
            <Contact />
          </Reveal>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
