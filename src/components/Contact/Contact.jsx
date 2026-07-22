import Container from "../Container";
import SectionTitle from "../SectionTitle";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";

/**
 * Contact
 * Formulario funcional (envía correos reales vía EmailJS) + redes sociales.
 */
const Contact = () => {
  return (
    <section id="contacto" className="py-24 md:py-32">
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div className="flex flex-col gap-8">
          <SectionTitle
            eyebrow="Contact"
            title="Let's Talk"
            description="Do you have a project in mind or an idea to automate? Message me and I'll get back to you soon."
          />

          <div>
            <p className="text-sm text-text-muted mb-4">You can also find me on:</p>
            <SocialLinks />
          </div>
        </div>

        <div className="relative">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
};

export default Contact;
