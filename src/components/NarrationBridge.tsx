"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function NarrationBridge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section
      ref={containerRef}
      aria-label="Narrativ bro"
      className="relative overflow-hidden min-h-[60vh] md:min-h-[70vh] flex items-center justify-center"
    >
      {/* Content - no opacity reduction, camera and text share same surface */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-brand-white/90">
            Det begynte med en idé, og en billett til USA.<br />
            Jeg pakket kameraet og dro for å studere musikk, film og TV.
          </p>
          
          <p className="text-brand-white/90">
            Tre år senere kom jeg hjem, gikk viralt, og levde de neste sju årene på reisefot.<br />
            Jeg jobbet med organisasjoner og merkevarer, sto på scener i tolv land, og skapte historier (musikalske og visuelle) som fortsatt lever der ute et sted.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default NarrationBridge;