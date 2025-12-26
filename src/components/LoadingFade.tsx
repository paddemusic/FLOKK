
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingFade() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex items-center justify-center text-white font-medium tracking-wider"
          style={{ backgroundColor: "var(--brand-red)", willChange: "opacity, transform" }}
          aria-live="polite"
          aria-label="Laster innhold"
        >
          LASTER INNHOLD …
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingFade;
  