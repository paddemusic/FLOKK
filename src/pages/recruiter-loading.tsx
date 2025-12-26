import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Palette,
  Sparkles,
  UserCircle2,
  Wand2,
} from "lucide-react";

interface LoadingStep {
  id: number;
  label: string;
  description: string;
  icon: JSX.Element;
}

const STEP_DURATION_MS = 950;
const REDIRECT_DELAY_MS = 900;

const loadingSteps: LoadingStep[] = [
  {
    id: 0,
    label: "Importing creativity",
    description: "Pulling in visual references, moods, and sonic atmosphere.",
    icon: <Palette className="h-5 w-5 text-sky-300" />,
  },
  {
    id: 1,
    label: "Syncing projects",
    description: "Aligning broadcasts, campaigns, and cinematic moments.",
    icon: <Sparkles className="h-5 w-5 text-emerald-300" />,
  },
  {
    id: 2,
    label: "Rendering personality",
    description: "Letting the voice, timing, and humor come into focus.",
    icon: <UserCircle2 className="h-5 w-5 text-sky-200" />,
  },
  {
    id: 3,
    label: "Optimizing stories",
    description: "Sharpening intros, hooks, and narrative arcs for impact.",
    icon: <Wand2 className="h-5 w-5 text-emerald-200" />,
  },
];

const RecruiterLoadingPage: NextPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (currentStep >= loadingSteps.length) {
      const timeoutId = window.setTimeout(() => {
        void router.push("/");
      }, REDIRECT_DELAY_MS);
      return () => window.clearTimeout(timeoutId);
    }

    const intervalId = window.setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        const ratio = Math.min(next / loadingSteps.length, 1);
        setProgress(Math.round(ratio * 100));
        return next;
      });
    }, STEP_DURATION_MS);

    return () => window.clearInterval(intervalId);
  }, [currentStep, router]);

  useEffect(() => {
    const ratio = Math.min(currentStep / loadingSteps.length, 1);
    setProgress(Math.round(ratio * 100));
  }, [currentStep]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 to-slate-900 text-slate-100 flex items-center justify-center px-4">
      <div className="relative max-w-xl w-full rounded-3xl border border-slate-800/80 bg-slate-950/80 px-8 py-10 shadow-[0_28px_80px_rgba(0,0,0,0.9)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_60%)] opacity-80 animate-pulse" />
        <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.14),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.1),transparent_55%)] mix-blend-screen opacity-80" />
        <div className="relative space-y-8">
          <header className="space-y-3 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-slate-500">
              Recruiter lane • Loading portfolio feed
            </p>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-50">
              Warming up the spotlight for you.
            </h1>
            <p className="text-sm text-slate-400">
              A quick preview reel is spinning up in the background.
            </p>
          </header>

          <div className="space-y-4">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-900/80">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.35),transparent_60%)] opacity-60" />
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute -inset-y-3 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60 blur-xl animate-[pulse_1.4s_ease-in-out_infinite]" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase tracking-[0.18em] text-slate-500">
                Feed status
              </span>
              <span className="tabular-nums text-slate-300">
                {progress}% ready
              </span>
            </div>
          </div>

          <div className="space-y-3 text-base">
            {loadingSteps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-slate-200 transition-all duration-500 ${
                    isCompleted
                      ? "border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_24px_rgba(16,185,129,0.45)]"
                      : isActive
                      ? "border-sky-500/80 bg-sky-500/10 shadow-[0_0_28px_rgba(56,189,248,0.5)]"
                      : "border-slate-800/80 bg-slate-900/60 opacity-50"
                  } ${
                    index <= currentStep
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/70 shadow-[0_10px_25px_rgba(0,0,0,0.85)] ${
                      isCompleted
                        ? "border-emerald-400/80 bg-emerald-500/10"
                        : isActive
                        ? "border-sky-400/80 bg-sky-500/10"
                        : ""
                    }`}
                  >
                    <span
                      className={`transition-transform duration-500 ${
                        isActive ? "scale-110" : "scale-100"
                      }`}
                    >
                      {step.icon}
                    </span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-slate-50">
                        {step.label}
                        {isActive && (
                          <span className="ml-1.5 align-middle text-[11px] font-normal uppercase tracking-[0.18em] text-sky-300">
                            Live
                          </span>
                        )}
                      </p>
                      {isCompleted && (
                        <span className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/90">
                          Done
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 tracking-[0.22em] uppercase text-center">
            You will be redirected to the portfolio as soon as the reel is ready.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterLoadingPage;