import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import CinematicHeroEnhanced from "@/components/CinematicHeroEnhanced";
import SectionTransition from "@/components/SectionTransition";
import PortfolioSection from "@/components/PortfolioSection";
import BTSAltStrip from "@/components/BTSAltStrip";
import SoMeMindsetSection from "@/components/SoMeMindsetSection";
import EpilogSection from "@/components/EpilogSection";
import ConnectionOutro from "@/sections/ConnectionOutro";
import ContactSection from "@/components/ContactSection";
import OmMegSection from "@/components/OmMegSection";
import { RoleLanding, RoleKey } from "@/components/RoleLanding";
import { EntryTransitionOverlay } from "@/components/EntryTransitionOverlay";
import { CareerSnapshot } from "@/components/CareerSnapshot";
import Link from "next/link";
import { useScrollPolish } from "@/lib/scrollPolish";
import { useMotionSync } from "@/hooks/useMotionSync";

// Loading fallback for heavy components
const HeavyComponentLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="animate-pulse text-white/50">Loading...</div>
  </div>
);

// Code-split heavy 3D and animation components
const ScrollCameraSection = dynamic(
  () => import("@/components/ScrollCameraSection").then((mod) => ({ default: mod.ScrollCameraSection })),
  { ssr: false, loading: HeavyComponentLoader }
);

const MusicalPulseLayer = dynamic(
  () => import("@/components/MusicalPulseLayer").then((mod) => ({ default: mod.MusicalPulseLayer })),
  { ssr: false }
);

const SplineChecklist = dynamic(
  () => import("@/components/SplineChecklist").then((mod) => ({ default: mod.SplineChecklist })),
  { ssr: false, loading: HeavyComponentLoader }
);

const SplineVisionProLab = dynamic(
  () => import("@/components/SplineVisionProLab").then((mod) => ({ default: mod.SplineVisionProLab })),
  { ssr: false, loading: HeavyComponentLoader }
);

const SplineCameraSwitchLab = dynamic(
  () => import("@/components/SplineCameraSwitchLab").then((mod) => ({ default: mod.SplineCameraSwitchLab })),
  { ssr: false, loading: HeavyComponentLoader }
);

const ResumeDocumentLayerNO = dynamic(
  () => import("@/components/ResumeDocumentLayerNO").then((mod) => ({ default: mod.ResumeDocumentLayerNO })),
  { ssr: false }
);

const CareerTimelineSection = dynamic(
  () => import("@/components/CareerTimelineSection").then((mod) => ({ default: mod.CareerTimelineSection })),
  { ssr: true, loading: HeavyComponentLoader }
);

/**
 * ⚠️ CRITICAL: SPOTIFY IS A STRICT NO-TOUCH ZONE ⚠️
 *
 * DO NOT edit, move, wrap, restyle, refactor, or "fix" anything related to Spotify.
 */

// Dynamically import SeOgHorSectionPart1 to prevent hydration errors with 3D content
const SeOgHorSectionPart1 = dynamic(
  () => import("@/components/SeOgHorSectionPart1").then((mod) => mod.SeOgHorSectionPart1),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-pulse text-white/50">Loading...</div>
      </div>
    )
  }
);

const ROLE_QUERY_KEY = "role";

function normalizeRole(value: unknown): RoleKey | null {
  if (value === "recruiter" || value === "admin" || value === "associate" || value === "partner") return value;
  return null;
}

export default function Home() {
  // Initialize scroll effects only on home page
  useScrollPolish();
  useMotionSync();

  const [selectedRole, setSelectedRole] = useState<RoleKey | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const teaserRef = useRef<HTMLDivElement | null>(null);
  const teaserInView = useInView(teaserRef, { once: true, margin: "-15% 0px -15% 0px" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const role = normalizeRole(params.get(ROLE_QUERY_KEY));
    if (role) setSelectedRole(role);
  }, []);

  const roleLabel = selectedRole ?? null;

  const handleSelectRole = (role: RoleKey) => {
    setSelectedRole(role);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set(ROLE_QUERY_KEY, role);
      window.history.replaceState({}, "", url.toString());
    }

    setTransitioning(true);

    window.setTimeout(() => {
      const target = document.querySelector("#hero");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => setTransitioning(false), 520);
    }, 120);
  };

  return (
    <>
      <Head>
        <title>Medie huset — Portfolio</title>
        <meta
          name="description"
          content="A calm, cinematic portfolio experience—built for clarity, pacing, and measurable impact."
        />
      </Head>

      <main className="min-h-screen relative">
        <MusicalPulseLayer />

        <EntryTransitionOverlay active={transitioning} />

        <RoleLanding onSelectRole={handleSelectRole} selectedRole={selectedRole} />

        <CinematicHeroEnhanced />

        <SectionTransition variant="fade" pulseHeading>
          <CareerSnapshot role={roleLabel} />
        </SectionTransition>

        <SectionTransition variant="fade" pulseHeading>
          <CareerTimelineSection />
        </SectionTransition>

        <SectionTransition variant="fade" pulseHeading>
          <PortfolioSection />
        </SectionTransition>

        <SectionTransition variant="fade" pulseHeading>
          <ScrollCameraSection>
            <div className="relative">
              <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
                <h2 className="mb-4">A mid-journey shift — how decisions get made</h2>
                <p className="text-white/70">
                  The camera settles. From here: process, constraints, and the experiments that shaped the work.
                </p>
              </div>
            </div>
          </ScrollCameraSection>
        </SectionTransition>

        <SectionTransition variant="fade" pulseHeading>
          <SeOgHorSectionPart1 />
        </SectionTransition>

        <SectionTransition variant="wipe" pulseHeading>
          <SplineChecklist />
        </SectionTransition>

        <SectionTransition variant="fade" pulseHeading>
          <SoMeMindsetSection />
        </SectionTransition>

        <SectionTransition variant="wipe" pulseHeading>
          <SplineCameraSwitchLab />
        </SectionTransition>

        <SectionTransition variant="wipe" pulseHeading>
          <SplineVisionProLab />
        </SectionTransition>

        <SectionTransition variant="fade">
          <ResumeDocumentLayerNO />
        </SectionTransition>

        <SectionTransition variant="fade" pulseHeading>
          <OmMegSection />
        </SectionTransition>

        <SectionTransition variant="slide">
          <ContactSection />
        </SectionTransition>

        <SectionTransition variant="slide">
          <ConnectionOutro />
        </SectionTransition>

        <SectionTransition variant="fade">
          <section aria-label="Playground teaser" className="relative">
            <div className="mx-auto max-w-6xl px-6 pb-10">
              <motion.div
                ref={teaserRef}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? undefined : teaserInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={prefersReducedMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
              >
                <Link
                  href="/play"
                  id="playground-teaser"
                  data-testid="playground-teaser"
                  className={[
                    "group block rounded-2xl border border-white/10 bg-black/30 px-6 py-6 md:px-8 md:py-7",
                    "transition-[transform,box-shadow,border-color] duration-300 ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                    "md:hover:-translate-y-1 md:hover:scale-[1.01] md:hover:border-white/20 md:hover:shadow-[0_18px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(224,0,43,0.10),0_0_48px_rgba(224,0,43,0.08)]",
                    "md:focus-visible:-translate-y-1 md:focus-visible:scale-[1.01] md:focus-visible:border-white/20 md:focus-visible:shadow-[0_18px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(224,0,43,0.10),0_0_48px_rgba(224,0,43,0.08)]",
                    "cursor-pointer",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <p className="smallcaps text-white/55">Optional</p>
                      <h3 className="mt-2 text-white text-2xl font-semibold leading-snug">Playground</h3>
                      <p className="mt-2 text-white/65 text-sm md:text-base">
                        Small experiments I build for fun.
                      </p>
                    </div>

                    <div className="shrink-0 pt-1">
                      <span
                        className={[
                          "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2",
                          "text-sm font-semibold text-white/80",
                          "transition-colors duration-200",
                        ].join(" ")}
                      >
                        <span className="relative">
                          Open
                          <span
                            aria-hidden="true"
                            className={[
                              "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full",
                              "bg-gradient-to-r from-brand-red/0 via-brand-red/60 to-brand-red/0",
                              "scale-x-0 origin-left transition-transform duration-300",
                              "md:group-hover:scale-x-100 md:group-focus-visible:scale-x-100",
                            ].join(" ")}
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className={[
                            "inline-block transition-transform duration-300",
                            "md:group-hover:translate-x-0.5 md:group-focus-visible:translate-x-0.5",
                          ].join(" ")}
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        </SectionTransition>

        <SectionTransition variant="fade">
          <BTSAltStrip />
        </SectionTransition>
      </main>
    </>
  );
}