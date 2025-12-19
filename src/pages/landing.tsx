"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type SeatType =
  | "Recruiter"
  | "Potential Customer"
  | "Family"
  | "Secret Admirer";

interface Seat {
  id: SeatType;
  label: string;
  subLabel: string;
}

const seats: Seat[] = [
  {
    id: "Recruiter",
    label: "Recruiter",
    subLabel: "Front Row",
  },
  {
    id: "Potential Customer",
    label: "Potential Customer",
    subLabel: "VIP Box",
  },
  {
    id: "Family",
    label: "Family",
    subLabel: "Balcony",
  },
  {
    id: "Secret Admirer",
    label: "Secret Admirer",
    subLabel: "Back Row",
  },
];

const LandingPage: NextPage = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * -0.06;

  function openPath(type: SeatType): void {
    if (type === "Recruiter") {
      void router.push("/recruiter-loading");
    } else {
      const target = `/fun-denied?who=${encodeURIComponent(type)}`;
      void router.push(target);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 to-zinc-900 text-slate-100 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          transition: "transform 80ms linear",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.12),transparent_55%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.9),transparent_60%)]" />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(248,250,252,0.07),transparent_60%)] mix-blend-screen opacity-70" />
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <section className="flex max-w-5xl flex-col items-center text-center space-y-10">
          <header className="space-y-4">
            <p className="text-xs tracking-[0.35em] uppercase text-slate-400">
              Mediehuset • Tonight&apos;s Screening
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-50">
              Welcome.{" "}
              <span className="text-slate-200/90">
                Choose your seat.
              </span>
            </h1>
            <p className="max-w-xl mx-auto text-base md:text-lg text-slate-400">
              Step into the dark. Each seat reveals a different cut of the
              same story. Pick the perspective that fits you best.
            </p>
          </header>

          <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
            {seats.map((seat) => (
              <button
                key={seat.id}
                type="button"
                onClick={() => openPath(seat.id)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/70 via-slate-950/90 to-black border border-slate-800/80 px-6 py-7 md:px-7 md:py-8 text-left shadow-[0_24px_60px_rgba(0,0,0,0.75)] transition-transform transition-shadow duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(0,0,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 seat-wiggle"
              >
                {/* Ambient highlight */}
                <div className="pointer-events-none absolute inset-x-0 -top-10 h-16 bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.18),transparent_70%)] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Seat back */}
                <div className="relative mb-4 flex items-end justify-between gap-4">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-400 border border-slate-800/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                      Cinema Seat
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-slate-400">
                        You are viewing as
                      </p>
                      <p className="mt-1 text-xl md:text-2xl font-semibold text-slate-50">
                        {seat.label}
                      </p>
                      <p className="text-sm text-slate-400/80">
                        {seat.subLabel}
                      </p>
                    </div>
                  </div>
                  {/* Stylized seat icon */}
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-1 rounded-[18px] bg-gradient-to-br from-slate-800/90 via-slate-900 to-black border border-slate-700/70 shadow-[0_18px_40px_rgba(0,0,0,0.9)]" />
                    <div className="absolute inset-x-3 bottom-1 h-2 rounded-b-[14px] bg-slate-800/90" />
                    <div className="absolute left-1 top-4 h-7 w-1 rounded-full bg-slate-700/80" />
                    <div className="absolute right-1 top-4 h-7 w-1 rounded-full bg-slate-700/80" />
                    <span className="relative text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                      {seat.subLabel.split(" ")[0]}
                    </span>
                  </div>
                </div>

                {/* Seat details */}
                <div className="relative mt-3 flex items-center justify-between gap-4 text-xs text-slate-400">
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      Mood
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-sky-400/90 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
                      <span className="text-slate-300/90">
                        Dark, cinematic, slightly playful
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      Action
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sky-300/90">
                      Enter
                      <span
                        aria-hidden="true"
                        className="inline-block h-[1px] w-6 bg-gradient-to-r from-sky-500/40 to-sky-300"
                      />
                    </span>
                  </div>
                </div>

                {/* Bottom glow */}
                <div className="pointer-events-none absolute inset-x-4 -bottom-10 h-10 bg-[radial-gradient(ellipse_at_center,rgba(15,118,110,0.8),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-70" />
              </button>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 tracking-[0.22em] uppercase">
            Hover to test the seat. Click when you&apos;re ready to watch.
          </p>
        </section>
      </main>

      <style jsx global>{`
        @keyframes seat-wiggle {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-1px) rotate(-0.6deg);
          }
          50% {
            transform: translateY(0) rotate(0.6deg);
          }
          75% {
            transform: translateY(-0.5px) rotate(-0.3deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        .seat-wiggle:hover {
          animation: seat-wiggle 260ms ease-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;