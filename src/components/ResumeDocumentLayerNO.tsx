import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";

export function ResumeDocumentLayerNO() {
  return (
    <section id="resume-no" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b] to-[#0f0f0f]" />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <motion.p {...fadeUpStagger} className="smallcaps text-white/55">
          Document layer
        </motion.p>
        <motion.h3 {...fadeUpStagger} transition={{ ...fadeUpStagger.transition, delay: 0.06 }} className="mt-4">
          CV / Resume (NO)
        </motion.h3>
        <motion.p
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.1 }}
          className="mt-4 text-white/70"
        >
          Dette er den formelle CV-en (bevisst på norsk). Den er presentert som et dokument-lag, separat fra den engelske
          narrativen.
        </motion.p>

        <motion.div
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.14 }}
          className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-6"
        >
          <p className="text-white/75">
            Innholdet her kan kobles til en PDF eller en mer komplett CV-side senere. I v2.0 holder vi dette rolig og
            skannbart.
          </p>

          <div className="mt-6 flex flex-col gap-2 text-sm">
            <a
              href="mailto:contact@hellonomusic.com"
              className="underline underline-offset-4 text-white/75 hover:text-white transition-colors"
            >
              Be om CV på e-post
            </a>
            <a href="#projects" className="underline underline-offset-4 text-white/45 hover:text-white/70 transition-colors">
              Tilbake til prosjekter
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}