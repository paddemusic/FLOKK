import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";

export function AboutSection() {
  return (
    <section id="om-meg" className="pt-32 pb-0 md:pt-40 md:pb-0 relative overflow-hidden bg-brand-black">
      <div data-parallax="0.15" className="container-custom max-w-4xl relative z-10 pb-32 md:pb-40">
        <motion.h2
          {...fadeUpStagger}
          className="text-center mb-8"
        >
          Om meg
        </motion.h2>
        <motion.div
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.1 }}
          className="space-y-6 text-brand-white/80"
        >
          <p>
            Strategisk og kreativ historieforteller med erfaring fra TV 2, Softgen AI og en rekke selvstendige prosjekter.
          </p>
          <p>
            Jeg kombinerer forståelse for medietrender, målgrupper og teknologi for å utvikle innhold som skaper engasjement og handling.
          </p>
          <p>
            Har oppnådd over <span className="text-brand-red font-semibold">300 millioner visninger og avspillinger</span> på tvers av egne prosjekter.
          </p>
        </motion.div>
      </div>
      
      {/* Seamless transition overlay extending into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-brand-black z-20 pointer-events-none" />
    </section>
  );
}

export default AboutSection;