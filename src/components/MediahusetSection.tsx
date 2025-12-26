import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";

export default function MediahusetSection() {
  return (
    <section id="mediahuset" className="relative overflow-hidden section-y overlap-fade">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]" />
      <div className="relative z-10 container-custom text-center">
        <motion.h2 {...fadeUpStagger} className="mb-4 text-4xl">Hvorfor Mediehuset Bergen?</motion.h2>
        <motion.p {...fadeUpStagger} transition={{ ...fadeUpStagger.transition, delay: 0.1 }} className="text-white/80 max-w-3xl mx-auto text-base">
          Jeg inspireres av hvordan Mediehuset Bergen kombinerer strategi, kreativitet og produksjon under ett tak.
          Med erfaring fra TV 2 og AI-drevet innholdsproduksjon ønsker jeg å bidra til å løfte historier som engasjerer,
          inspirerer og skaper verdi for kundene.
        </motion.p>
        <motion.div {...fadeUpStagger} transition={{ ...fadeUpStagger.transition, delay: 0.2 }} className="mt-6">
          <a href="#se-og-hor" className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium bg-[#E0002B] text-white hover:bg-[#E0002B]/90 transition-colors">
            Se relevant arbeid
          </a>
        </motion.div>
      </div>
    </section>
  );
}
