import Container from "../Container";
import SectionTitle from "../SectionTitle";
import CertificateCard from "./CertificateCard";
import { certificates } from "../../data/certificates";

/**
 * Certificates
 * Grilla de certificados con acceso directo al PDF de cada uno.
 */
const Certificates = () => {
  return (
    <section id="certificados" className="py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <SectionTitle
          eyebrow="Certificates"
          title="Continuous Learning"
          description="Courses and diplomas that support and expand upon my practical experience in real-world projects."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.id} {...certificate} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Certificates;
