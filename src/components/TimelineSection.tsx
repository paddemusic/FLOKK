import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";
import { timeline } from "@/data/timeline";
import { Briefcase, GraduationCap, Sparkles } from "lucide-react";
import type { TimelineItem } from "@/data/timeline";

export default function TimelineSection() {
  const items: TimelineItem[] = Array.isArray(timeline) ? timeline : [];
  if (items.length === 0) {
    return (
      <section id="karrierebane" className="relative overflow-hidden section-y overlap-fade">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]" />
        <div className="relative z-10 container-custom text-center">
          <motion.h2 {...fadeUpStagger} className="mb-2">
            Karrierebane
          </motion.h2>
          <motion.p {...fadeUpStagger} transition={{ ...fadeUpStagger.transition, delay: 0.1 }} className="text-white/60">
            Innhold kommer snart.
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section id="karrierebane" className="relative overflow-hidden section-y overlap-fade">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]" />
      <div className="relative z-10 container-custom">
        <header className="text-center mb-8">
          <motion.h2 {...fadeUpStagger} className="mb-2">
            Career timeline — the short version
          </motion.h2>
          <motion.p {...fadeUpStagger} transition={{ ...fadeUpStagger.transition, delay: 0.08 }} className="text-white/70">
            A few milestones, skimmable by design — with just enough context to orient you.
          </motion.p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((entry, idx) => {
            const Icon = entry.type === "education" ? GraduationCap : entry.type === "freelance" ? Sparkles : Briefcase;
            return (
              <motion.article
                key={`${entry.year}-${entry.company}-${idx}`}
                {...fadeUpStagger}
                transition={{ ...fadeUpStagger.transition, delay: 0.12 + idx * 0.06 }}
                className="rounded-xl border border-white/10 bg-black/30 p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${entry.type === "education" ? "bg-blue-500/10 text-blue-400" : entry.type === "freelance" ? "bg-purple-500/10 text-purple-400" : "bg-red-500/10 text-red-400"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{entry.year}</h4>
                    <p className="text-white/85 font-medium">{entry.title}</p>
                    <p className="text-white/70 text-sm">{entry.company}</p>
                  </div>
                </div>
                <p className="text-white/70 mt-2">{entry.description}</p>
                {Array.isArray(entry.highlights) && entry.highlights.length > 0 && (
                  <ul className="mt-3 list-disc list-inside text-white/75 space-y-1 text-sm">
                    {entry.highlights.map((p: string, i: number) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}