import { FaAward, FaFilePdf } from "react-icons/fa6";
import Card from "../Card";

/**
 * CertificateCard
 * Tarjeta con ícono, título, institución y año, con botón para abrir el PDF
 * del certificado en una pestaña nueva.
 */
const CertificateCard = ({ title, issuer, date, pdfUrl }) => {
  return (
    <Card className="flex flex-col gap-4">
      <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary-soft">
        <FaAward className="text-lg" aria-hidden="true" />
      </span>

      <div className="flex-1">
        <h3 className="font-display text-base font-semibold text-text">{title}</h3>
        <p className="text-sm text-text-muted mt-1">{issuer}</p>
        <span className="font-mono text-xs text-text-subtle">{date}</span>
      </div>

      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir certificado: ${title}`}
        className="inline-flex items-center gap-2 text-sm text-primary-soft hover:text-primary transition-colors"
      >
        <FaFilePdf aria-hidden="true" /> Ver certificado
      </a>
    </Card>
  );
};

export default CertificateCard;
