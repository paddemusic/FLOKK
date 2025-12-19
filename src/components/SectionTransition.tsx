import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "wipe";
  className?: string;
  pulseHeading?: boolean;
}

export default function SectionTransition({ 
  children, 
  variant = "fade",
  className = "",
  pulseHeading = false,
}: SectionTransitionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    fade: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 0.8, ease: "easeOut" }
    },
    slide: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
    wipe: {
      initial: { opacity: 0, scale: 0.95 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const config = variants[variant];

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={config.initial}
      whileInView={config.whileInView}
      viewport={config.viewport}
      transition={config.transition}
    >
      {pulseHeading && isInView && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.15, 0],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-red/20 to-transparent blur-2xl" />
        </motion.div>
      )}
      {children}
    </motion.div>
  );
}
