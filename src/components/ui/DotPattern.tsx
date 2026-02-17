import { motion } from "framer-motion";

export default function DotPattern() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(rgba(99,102,241,0.25) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
      animate={{
        backgroundPosition: ["0px 0px", "40px 40px"],
      }}
      transition={{
        duration: 18,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  );
}
