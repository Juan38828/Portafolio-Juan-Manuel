import { motion } from "framer-motion";
import profilePhoto from "../../assets/images/profile.webp";

/**
 * HeroPhoto
 * Fotografía circular con glow azul/morado y un anillo punteado que gira muy
 * lentamente detrás — un guiño sutil al mundo de "sistemas" sin ser literal.
 */
const HeroPhoto = ({ src = profilePhoto, alt = "Juan Manuel Franco" }) => {
  return (
    <div className="relative w-56 h-56 xs:w-64 xs:h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto">
      {/* Glow ambiental */}
      <div
        className="absolute inset-[-20%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(59,130,246,0.35), transparent 60%), radial-gradient(circle at 70% 70%, rgba(124,58,237,0.28), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Anillo punteado giratorio */}
      <motion.div
        className="absolute inset-[-14px] rounded-full border border-dashed border-primary/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full rounded-full overflow-hidden border border-border shadow-2xl backdrop-blur-sm"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 20%" }}
          loading="eager"
        />
      </motion.div>
    </div>
  );
};

export default HeroPhoto;
