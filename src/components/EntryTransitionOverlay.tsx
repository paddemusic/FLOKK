"use client";

import { motion, useReducedMotion } from "framer-motion";

export interface EntryTransitionOverlayProps {
  active: boolean;
  label?: string;
}

export function EntryTransitionOverlay({ active, label = "Transition" }: EntryTransitionOverlayProps) {
  const prefersReduced = useReducedMotion();

  if (!active) return null;

  return (
    <motion.div
      aria-label={label}
      className="fixed inset-0 z-[60] pointer-events-none"
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
      animate={prefersReduced ? { opacity: 1 } : { opacity: 1 }}
      exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
      transition={{ duration: prefersReduced ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <motion.div
        className="absolute inset-0"
        initial={prefersReduced ? undefined : { filter: "blur(0px)" }}
        animate={prefersReduced ? undefined : { filter: "blur(10px)" }}
        transition={{ duration: prefersReduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(900px 500px at 20% 20%, rgba(255, 138, 92, 0.12), transparent 60%), radial-gradient(900px 500px at 80% 30%, rgba(224, 0, 43, 0.14), transparent 60%)",
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/60 text-xs smallcaps tracking-widest"
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
        animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: prefersReduced ? 0.15 : 0.5, delay: prefersReduced ? 0 : 0.08 }}
      >
        Entering
      </motion.div>
    </motion.div>
  );
}