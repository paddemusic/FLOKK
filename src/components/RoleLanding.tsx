"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Settings, Users, Handshake } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export type RoleKey = "recruiter" | "admin" | "associate" | "partner";

export interface RoleLandingProps {
  onSelectRole: (role: RoleKey) => void;
  selectedRole?: RoleKey | null;
}

interface RoleOption {
  key: RoleKey;
  title: string;
  subtitle: string;
  hint: string;
  icon: React.ReactNode;
}

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function RoleLanding({ onSelectRole, selectedRole = null }: RoleLandingProps) {
  const prefersReduced = useReducedMotion();
  const mounted = useMounted();
  const [hovered, setHovered] = useState<RoleKey | null>(null);

  const roles: RoleOption[] = useMemo(
    () => [
      {
        key: "recruiter",
        title: "Recruiter",
        subtitle: "Fast signal, clear outcomes",
        hint: "Career snapshot + proof first",
        icon: <Briefcase className="h-5 w-5" />,
      },
      {
        key: "admin",
        title: "Admin",
        subtitle: "Structure, reliability, momentum",
        hint: "Operations + clarity of delivery",
        icon: <Settings className="h-5 w-5" />,
      },
      {
        key: "associate",
        title: "Associate",
        subtitle: "Craft, range, execution",
        hint: "Work samples + process highlights",
        icon: <Users className="h-5 w-5" />,
      },
      {
        key: "partner",
        title: "Partner",
        subtitle: "Strategy, trust, long-term fit",
        hint: "Narrative + positioning + collaboration",
        icon: <Handshake className="h-5 w-5" />,
      },
    ],
    []
  );

  const active = hovered ?? selectedRole ?? null;

  return (
    <section
      id="entry"
      className="relative min-h-[100dvh] overflow-hidden bg-[radial-gradient(1200px_700px_at_20%_20%,rgba(255,138,92,0.10),transparent_60%),radial-gradient(900px_500px_at_80%_30%,rgba(224,0,43,0.10),transparent_55%),linear-gradient(to_bottom,#080808,#0d0d0d_60%,#0a0a0a)]"
      aria-label="Role selection landing"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-between px-6 py-16 md:py-20">
        <header className="max-w-2xl">
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="smallcaps text-white/60"
          >
            Medie huset · Portfolio v2
          </motion.p>

          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02]"
          >
            Calm, cinematic work.
            <br />
            Clear, measurable impact.
          </motion.h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-white/70 max-w-xl"
          >
            Choose how you want to evaluate this portfolio. The journey adapts its pacing—without losing the story.
          </motion.p>
        </header>

        <div className="mt-14">
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role, idx) => {
              const isActive = active === role.key;
              return (
                <motion.button
                  key={role.key}
                  type="button"
                  onMouseEnter={() => setHovered(role.key)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(role.key)}
                  onBlur={() => setHovered(null)}
                  onClick={() => onSelectRole(role.key)}
                  initial={prefersReduced ? false : { opacity: 0, y: 18 }}
                  animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 + idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={[
                    "group relative overflow-hidden rounded-2xl border px-6 py-6 text-left transition-colors",
                    "bg-white/[0.03] hover:bg-white/[0.05]",
                    "border-white/10 hover:border-white/20",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/60",
                    isActive ? "border-white/25 bg-white/[0.06]" : "",
                  ].join(" ")}
                  style={
                    mounted && !prefersReduced
                      ? {
                          transform: isActive ? "translateY(-1px)" : undefined,
                        }
                      : undefined
                  }
                  aria-label={`Select ${role.title} view`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(224,0,43,0.20)_0%,transparent_60%)] blur-2xl" />
                    <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,138,92,0.16)_0%,transparent_60%)] blur-2xl" />
                  </div>

                  <div className="relative z-10 flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-white/80 group-hover:text-white">
                      {role.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-white text-xl font-semibold leading-tight">{role.title}</h3>
                        <span className="text-white/40 text-xs smallcaps">Enter</span>
                      </div>
                      <p className="mt-1 text-white/70">{role.subtitle}</p>
                      <p className="mt-3 text-white/50 text-sm">{role.hint}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-2 text-white/45 text-sm">
            <p>
              Tip: press <span className="font-mono text-white/70">Tab</span> to navigate roles and{" "}
              <span className="font-mono text-white/70">Enter</span> to select.
            </p>
          </div>
        </div>

        <footer className="mt-12 flex items-center justify-between gap-4 text-white/40 text-xs">
          <p className="smallcaps">Fast load · Mobile-first · Intentional pacing</p>
          <p className="smallcaps">© 2025</p>
        </footer>
      </div>
    </section>
  );
}