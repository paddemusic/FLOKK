import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";

export default function OriginsEvolution() {
  return (
    <section
      aria-label="Opprinnelse &amp; utvikling"
      className="relative flex flex-col justify-center items-center text-[#E0E0E0] py-20"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#121212]" />

      <motion.div {...fadeUpStagger} className="relative z-10 text-center max-w-2xl px-6">
        <h2 className="text-white tracking-tight">
          Opprinnelse &amp; utvikling
        </h2>
        <motion.p
          data-rise
          className="mt-4 max-w-2xl mx-auto leading-relaxed text-[#CFCFCF]"
        >
          Det startet med nysgjerrighet. Kameraet ble en forlengelse av
          historiefortellingen, en måte å fange øyeblikk som lever videre.
          Fra musikkvideoer til markedsføring, fra idé til ferdig visuell reise.
        </motion.p>
      </motion.div>

      <motion.i
        data-rise
        className="relative z-10 mt-10 block text-center opacity-80 italic"
      >
        <small>«Every frame is a footprint of the journey so far.»</small>
      </motion.i>
    </section>
  );
}