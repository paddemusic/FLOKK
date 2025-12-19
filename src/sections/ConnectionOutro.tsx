import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";

export default function ConnectionOutro() {
  return (
    <section
      aria-label="Avsluttende invitasjon til samarbeid"
      data-nobg="true"
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0a0a0a] to-[#0a0a0a]" />
      
      {/* Floating light accent with red thread dissolution effect */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-brand-red/15 to-[#FF8A5C]/10 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,39,39,0.08),transparent)] opacity-50"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.h2
          {...fadeUpStagger}
          className="text-4xl font-bold text-white max-w-2xl leading-tight text-glow"
        >
          Hvis teknologi bygger strukturen,<br />
          er historiene det som gir den liv.
        </motion.h2>

        <motion.p
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.1 }}
          className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed mx-auto"
        >
          Jeg tror på verdien av innhold som ikke bare vises — men føles.
          <br />
          La oss skape noe som får folk til å stoppe opp.
        </motion.p>

        {/* Unified wrapper for CTA with red thread fade */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          {/* Red thread dissolution line */}
          <motion.div
            className="w-full max-w-md h-[2px] bg-gradient-to-r from-transparent via-brand-red/50 to-transparent"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scaleX: [1, 0.8, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#se-og-hor"
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-brand-red to-[#FF8A5C] text-white text-base font-semibold transition-all duration-300 overflow-hidden group"
              aria-label="Se prosjekter"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(217, 39, 39, 0.4)",
                    "0 0 40px rgba(217, 39, 39, 0.6)",
                    "0 0 20px rgba(217, 39, 39, 0.4)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10">Se prosjekter</span>
              
              {/* Breathing pulse effect */}
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-full"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.a>
            
            <motion.a
              href="#kontakt"
              className="px-8 py-4 rounded-full border-2 border-white/40 text-white text-base font-semibold hover:border-brand-red hover:bg-white/5 transition-all duration-300"
              aria-label="Kontakt meg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Kontakt meg
            </motion.a>
          </div>
          
          {/* Light fade effect at bottom */}
          <motion.div
            className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-[#FF8A5C]/40 to-transparent"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Bottom fade to black */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 2 }}
      />
    </section>
  );
}
