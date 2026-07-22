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
        <Particles className="opacity-60" />

        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Certificates />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
