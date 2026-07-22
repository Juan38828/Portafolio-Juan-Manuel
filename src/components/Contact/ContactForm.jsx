import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import { useContactForm } from "../../hooks/useContactForm";

const initialValues = { name: "", email: "", message: "", company: "" };

/**
 * ContactForm
 * Formulario controlado con validación básica y campo honeypot ("company",
 * oculto visualmente) contra spam de bots. El envío real ocurre vía
 * EmailJS (ver useContactForm.js).
 */
const ContactForm = () => {
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState({});
  const { status, errorMessage, sendMessage, reset, STATUS } = useContactForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    if (!values.name.trim()) errors.name = "Ingresa tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Ingresa un correo válido.";
    }
    if (values.message.trim().length < 10) {
      errors.message = "Cuéntame un poco más (mínimo 10 caracteres).";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Honeypot: si un bot llenó este campo oculto, se descarta silenciosamente.
    if (values.company) return;

    if (!validate()) return;

    await sendMessage(values);
    setValues(initialValues);
  };

  if (status === STATUS.SUCCESS) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 text-center py-12 border border-primary/25 rounded-2xl bg-primary/5"
      >
        <FaCircleCheck className="text-3xl text-primary-soft" aria-hidden="true" />
        <p className="text-text font-medium">¡Mensaje enviado con éxito!</p>
        <p className="text-text-muted text-sm max-w-xs">
          Gracias por escribir. Te responderé lo antes posible.
        </p>
        <button
          onClick={reset}
          className="text-sm text-primary-soft hover:text-primary underline underline-offset-4 mt-1"
        >
          Enviar otro mensaje
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot: oculto para personas, visible para bots */}
      <input
        type="text"
        name="company"
        value={values.company}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px opacity-0"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm text-text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          autoComplete="name"
          className="rounded-lg border border-border bg-bg-elevated/60 px-4 py-3 text-text placeholder:text-text-subtle focus:border-primary outline-none transition-colors"
          placeholder="Your name"
        />
        {fieldErrors.name && (
          <span className="text-xs text-red-400">{fieldErrors.name}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm text-text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
          className="rounded-lg border border-border bg-bg-elevated/60 px-4 py-3 text-text placeholder:text-text-subtle focus:border-primary outline-none transition-colors"
          placeholder="your.email@example.com"
        />
        {fieldErrors.email && (
          <span className="text-xs text-red-400">{fieldErrors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm text-text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          className="rounded-lg border border-border bg-bg-elevated/60 px-4 py-3 text-text placeholder:text-text-subtle focus:border-primary outline-none transition-colors resize-none"
          placeholder="Tell me about your project or idea..."
        />
        {fieldErrors.message && (
          <span className="text-xs text-red-400">{fieldErrors.message}</span>
        )}
      </div>

      <AnimatePresence>
        {status === STATUS.ERROR && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-sm text-red-400"
          >
            <FaCircleExclamation aria-hidden="true" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === STATUS.SENDING}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary-soft transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === STATUS.SENDING ? "Sending..." : "Send Message"}
        <FaPaperPlane aria-hidden="true" />
      </motion.button>
    </form>
  );
};

export default ContactForm;
