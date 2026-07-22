import { useState } from "react";
import emailjs from "@emailjs/browser";

const STATUS = {
  IDLE: "idle",
  SENDING: "sending",
  SUCCESS: "success",
  ERROR: "error",
};

/**
 * useContactForm
 * Maneja el estado del formulario y el envío real de correo vía EmailJS.
 *
 * Requiere 3 variables de entorno (ver .env.example):
 *   VITE_EMAILJS_SERVICE_ID
 *   VITE_EMAILJS_TEMPLATE_ID
 *   VITE_EMAILJS_PUBLIC_KEY
 *
 * Sin estas variables configuradas, el envío fallará con un mensaje claro
 * en consola en vez de fallar silenciosamente.
 */
export function useContactForm() {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");

  const sendMessage = async ({ name, email, message }) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const message =
        "Faltan las variables de entorno de EmailJS. Revisa el archivo .env (ver .env.example) y las instrucciones en README.md.";
      console.error(message);
      setStatus(STATUS.ERROR);
      setErrorMessage(message);
      return;
    }

    setStatus(STATUS.SENDING);
    setErrorMessage("");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          from_email: email,
          message,
        },
        { publicKey }
      );
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setStatus(STATUS.ERROR);
      setErrorMessage(
        "No se pudo enviar el mensaje. Intenta de nuevo o escribe directamente por correo."
      );
    }
  };

  const reset = () => {
    setStatus(STATUS.IDLE);
    setErrorMessage("");
  };

  return { status, errorMessage, sendMessage, reset, STATUS };
}
