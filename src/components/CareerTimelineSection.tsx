"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { timeline } from "@/data/timeline";
import type { TimelineItem } from "@/data/timeline";
import { Briefcase, GraduationCap, Sparkles } from "lucide-react";

interface CareerTimelineSectionProps {
  id?: string;
}

type ActiveMode = "active" | "past" | "future";

function getMode(index: number, activeIndex: number): ActiveMode {
  if (index === activeIndex) return "active";
  if (index < activeIndex) return "past";
  return "future";
}

function getIconForType(type: TimelineItem["type"] | undefined) {
  if (type === "education") return GraduationCap;
  if (type === "freelance") return Sparkles;
  return Briefcase;
}

function useActiveTimelineIndex(triggerIds: string[]) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const elements = triggerIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));

        if (visible.length === 0) return;

        const topMost = visible[0]?.target as HTMLElement | undefined;
        if (!topMost) return;

        const idx = elements.indexOf(topMost);
        if (idx >= 0) setActiveIndex(idx);
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.05, 0.1, 0.15],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [triggerIds]);

  return activeIndex;
}

interface TimelineRailProps {
  progress: ReturnType<typeof useTransform>;
}

function TimelineRail({ progress }: TimelineRailProps) {
  return (
    <div className="absolute left-6 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
      <div className="absolute inset-0 bg-white/10" />
      <motion.div
        className="absolute left-0 top-0 w-px bg-brand-red/70"
        style={{
          height: progress,
          transformOrigin: "top",
        }}
      />
    </div>
  );
}

interface TimelineMilestoneProps {
  item: TimelineItem;
  index: number;
  mode: ActiveMode;
  prefersReduced: boolean;
}

function TimelineMilestone({ item, index, mode, prefersReduced }: TimelineMilestoneProps) {
  const Icon = getIconForType(item.type);

  const contentOpacity = mode === "active" ? 1 : mode === "past" ? 0.75 : 0.6;
  const periodOpacity = mode === "active" ? 0.65 : mode === "past" ? 0.55 : 0.45;

  return (
    <article
      className={[
        "relative grid gap-4 py-10 md:py-12",
        "md:grid-cols-[1fr_56px_1fr]",
      ].join(" ")}
      aria-label={`Timeline item ${index + 1}`}
    >
      <div className="hidden md:block" />

      <div className="relative flex items-start justify-start md:justify-center">
        <div
          className={[
            "relative z-10 mt-1 flex h-11 w-11 items-center justify-center rounded-full border",
            mode === "active" ? "border-brand-red/40 bg-black/60 text-white" : "border-white/10 bg-black/40 text-white/80",
          ].join(" ")}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div
          className={[
            "absolute left-6 top-0 h-full w-px md:left-1/2 md:-translate-x-1/2",
            "bg-transparent",
          ].join(" ")}
          aria-hidden="true"
        />
      </div>

      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 10 }}
        whileInView={prefersReduced ? undefined : { opacity: contentOpacity, y: mode === "active" ? 0 : 0 }}
        animate={
          prefersReduced
            ? { opacity: contentOpacity }
            : mode === "active"
            ? { opacity: 1, y: 0, scale: 1.01 }
            : { opacity: contentOpacity, y: 0, scale: 1 }
        }
        viewport={{ once: true, margin: "-15% 0px -55% 0px" }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }
        className="min-w-0"
        style={prefersReduced ? { opacity: contentOpacity, filter: "none", transform: "none" } : { opacity: contentOpacity, filter: "none" }}
      >
        <p className="smallcaps text-xs" style={{ opacity: periodOpacity }}>
          {item.year}
        </p>

        <h3 className="mt-2 text-white text-xl font-semibold leading-snug">{item.title}</h3>

        <p className="mt-2 text-white/70">{item.description}</p>

        {item.company && (
          <p className="mt-3 text-white/50 text-sm">
            <span className="text-white/35">Context:</span> {item.company}
          </p>
        )}

        {Array.isArray(item.highlights) && item.highlights.length > 0 && (
          <ul className="mt-4 space-y-1 text-white/60 text-sm">
            {item.highlights.map((h, i) => (
              <li key={`${item.year}-${i}`}>• {h}</li>
            ))}
          </ul>
        )}
      </motion.div>
    </article>
  );
}

export function CareerTimelineSection({ id = "career-timeline" }: CareerTimelineSectionProps) {
  const prefersReduced = useReducedMotion();
  const items: TimelineItem[] = Array.isArray(timeline) ? timeline : [];

  const sectionRef = useRef<HTMLElement>(null);

  const triggerIds = useMemo(() => items.map((_, idx) => `${id}-trigger-${idx}`), [id, items.length]);
  const activeIndex = useActiveTimelineIndex(triggerIds);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.2"],
  });

  const railProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (items.length === 0) {
    return (
      <section id={id} className="relative overflow-hidden section-y overlap-fade">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#101010]" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <header className="max-w-3xl">
            <p className="smallcaps text-white/55">Chapter</p>
            <h2 className="mt-4">Career timeline</h2>
            <p className="mt-4 text-white/70">Timeline content will be added shortly.</p>
          </header>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id={id} className="relative overflow-hidden section-y overlap-fade">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#101010]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_38%,_rgba(0,0,0,0.5)_100%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <header className="max-w-3xl">
          <p className="smallcaps text-white/55">Career</p>
          <h2 className="mt-4">Career timeline — progression, not a CV dump</h2>
          <p className="mt-4 text-white/70">
            A skimmable sequence of chapters. Each step signals focus, context, and what changed along the way.
          </p>
        </header>

        <div className="relative mt-10 md:mt-14">
          <TimelineRail progress={prefersReduced ? ("100%" as unknown as ReturnType<typeof useTransform>) : railProgress} />

          <div className="relative">
            {items.map((item, idx) => {
              const mode = getMode(idx, activeIndex);

              return (
                <div key={`${item.year}-${item.title}-${idx}`} className="relative">
                  <div id={triggerIds[idx]} className="absolute left-0 right-0 top-1/2 h-px" aria-hidden="true" />
                  <TimelineMilestone item={item} index={idx} mode={mode} prefersReduced={prefersReduced} />
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-white/45 text-sm">
            <p>
              Tip: scroll to reveal each chapter. If you prefer less motion, your system setting will keep everything readable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}