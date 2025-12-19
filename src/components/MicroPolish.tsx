
import { motion } from "framer-motion";
import { useEffect } from "react";

export function MicroPolish() {
  useEffect(() => {
    const onOver = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest("a,button") as HTMLElement | null;
      if (target) target.classList.add("hovering");
    };
    const onOut = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest("a,button") as HTMLElement | null;
      if (target) target.classList.remove("hovering");
    };
    window.addEventListener("mouseover", onOver as EventListener, { passive: true });
    window.addEventListener("mouseout", onOut as EventListener, { passive: true });
    return () => {
      window.removeEventListener("mouseover", onOver as EventListener);
      window.removeEventListener("mouseout", onOut as EventListener);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 pointer-events-none mix-blend-overlay z-[1]"
      aria-hidden="true"
    >
      <div className="absolute bottom-12 right-12 flex flex-col gap-3 items-end text-sm text-neutral-200">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="tracking-widest uppercase font-medium"
        >
          • 300M+ visninger
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="tracking-widest uppercase font-medium"
        >
          • 250K+ følgere
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="tracking-widest uppercase font-medium"
        >
          • 400+ konserter
        </motion.span>
      </div>
    </motion.div>
  );
}
  