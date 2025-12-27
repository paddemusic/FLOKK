import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";
import { useMemo } from "react";
import React from "react";

export interface CareerSnapshotProps {
  role?: string | null;
}

const cvHighlightsNo: string[] = [
  "TV 2 (SoMe / content)",
  "Softgen AI (product + content)",
  "Freelance campaigns & storytelling",
];

export const CareerSnapshot = React.memo(function CareerSnapshot({ role = null }: CareerSnapshotProps) {
  const lens = useMemo(
    () =>
      role === "recruiter"
        ? {
            title: "Career snapshot — the signal up front",
            intro: "A recruiter-first overview: role fit, working style, and the outcomes I'm hired to drive.",
          }
        : role === "partner"
        ? {
            title: "Career snapshot — how we'd work together",
            intro: "A fast read on my background, collaboration style, and where I add leverage over time.",
          }
        : role === "admin"
        ? {
            title: "Career snapshot — clarity and delivery",
            intro: "A structured overview with an emphasis on reliability, cadence, and clean handoffs.",
          }
        : {
            title: "Career snapshot — craft with intent",
            intro: "A condensed view of where I've been, and the strengths I bring to a team.",
          },
    [role]
  );

  return (
    <section id="career" className="relative overflow-hidden section-y overlap-fade">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#101010]" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <header className="max-w-3xl">
          <motion.p {...fadeUpStagger} className="smallcaps text-white/55">
            Chapter 02
          </motion.p>
          <motion.h2 {...fadeUpStagger} transition={{ ...fadeUpStagger.transition, delay: 0.06 }} className="mt-4">
            {lens.title}
          </motion.h2>
          <motion.p
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.1 }}
            className="mt-4 text-white/70"
          >
            {lens.intro}
          </motion.p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <motion.div
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.14 }}
            className="rounded-2xl border border-white/10 bg-black/25 p-6"
          >
            <h3 className="text-white text-xl font-semibold">What I bring</h3>
            <ul className="mt-4 space-y-2 text-white/75">
              <li>Story + strategy that stays measurable</li>
              <li>Visual-first production with strong pacing</li>
              <li>Modern tooling (AI) without losing taste</li>
            </ul>
          </motion.div>

          <motion.div
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.18 }}
            className="rounded-2xl border border-white/10 bg-black/25 p-6"
          >
            <h3 className="text-white text-xl font-semibold">How I work</h3>
            <ul className="mt-4 space-y-2 text-white/75">
              <li>Clear constraints → clear decisions</li>
              <li>Fast iteration, calm delivery</li>
              <li>Finish-minded: polish, performance, clarity</li>
            </ul>
          </motion.div>

          <motion.div
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.22 }}
            className="rounded-2xl border border-white/10 bg-black/25 p-6"
          >
            <h3 className="text-white text-xl font-semibold">CV (NO) — document layer</h3>
            <p className="mt-3 text-white/65 text-sm">
              Formal resume content is intentionally kept in Norwegian for now.
            </p>
            <ul className="mt-4 space-y-2 text-white/70 text-sm">
              {cvHighlightsNo.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#resume-no"
                className="text-sm underline underline-offset-4 text-white/70 hover:text-white transition-colors"
              >
                Open CV (NO)
              </a>
              <a
                href="#contact"
                className="text-sm underline underline-offset-4 text-white/45 hover:text-white/75 transition-colors"
              >
                Skip to contact
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});