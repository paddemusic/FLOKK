import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";
import media from "@/data/media";

export default function OmMegSection() {
  return (
    <section id="about" className="relative overflow-hidden py-20 overlap-fade">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_40%,_rgba(0,0,0,0.35)_100%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full order-2 md:order-1"
          >
            <div 
              className="bg-white p-4 rounded-lg"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)"
              }}
            >
              <img
                src="/2021-02-18_22.46.18.jpg"
                alt="Press feature"
                loading="lazy"
                className="w-full h-auto rounded-[8px] object-contain"
                style={{ 
                  maxWidth: "500px",
                  display: "block",
                  margin: "auto",
                  filter: "contrast(1.02) brightness(0.98)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}
              />
            </div>
          </motion.div>

          <div className="space-y-5 order-1 md:order-2">
            <div className="text-left">
              <motion.h2 {...fadeUpStagger} className="mb-2">
                About me — craft, taste, and follow-through
              </motion.h2>
              <motion.div
                {...fadeUpStagger}
                transition={{ ...fadeUpStagger.transition, delay: 0.05 }}
                className="h-[2px] w-[24px] bg-[#E0002B] mb-4"
                aria-hidden="true"
              />
              <motion.img
                {...fadeUpStagger}
                transition={{ ...fadeUpStagger.transition, delay: 0.08 }}
                src={media.pjpromo}
                alt="PJ promo"
                loading="lazy"
                className="w-16 h-auto opacity-90 fade-in-smooth"
              />
            </div>

            <motion.p
              {...fadeUpStagger}
              transition={{ ...fadeUpStagger.transition, delay: 0.1 }}
              className="text-brand-white/80"
            >
              I work where narrative meets performance — shaping stories that read clean and land with intent.
            </motion.p>

            <motion.p
              {...fadeUpStagger}
              transition={{ ...fadeUpStagger.transition, delay: 0.18 }}
              className="text-brand-white/80"
            >
              The through-line is taste, pacing, and measurable outcomes across music, video, and digital growth.
            </motion.p>

            <motion.p
              {...fadeUpStagger}
              transition={{ ...fadeUpStagger.transition, delay: 0.26 }}
              className="text-brand-white/80"
            >
              If we work together, you’ll get calm execution, strong direction, and a finish-minded approach to details.
            </motion.p>

            <motion.ul
              {...fadeUpStagger}
              transition={{ ...fadeUpStagger.transition, delay: 0.42 }}
              className="mt-6 grid gap-2 text-brand-white/85"
            >
              <li>• 300M+ views/plays across projects</li>
              <li>• Media studies in the US</li>
              <li>• Released music featured on radio and TV</li>
              <li>• Worked with brands like TV 2 and Kreftforeningen</li>
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}