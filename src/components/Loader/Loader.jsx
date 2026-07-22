import { motion, AnimatePresence } from "framer-motion";

/**
 * Loader
 * Pantalla de carga inicial breve con el monograma "JF" trazándose.
 * Se controla desde App.jsx con un estado `isLoading`.
 */
const Loader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          aria-hidden="true"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.1em" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl text-text"
          >
            JMF
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
