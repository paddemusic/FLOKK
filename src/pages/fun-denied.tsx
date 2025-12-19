import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const FunDeniedPage: NextPage = () => {
  const router = useRouter();
  const whoRaw = router.query.who;
  const who = Array.isArray(whoRaw) ? whoRaw[0] : whoRaw || "mysterious stranger";

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-slate-950 to-zinc-900 text-slate-100 flex items-center justify-center px-4">
      <div className="relative max-w-lg w-full rounded-3xl border border-slate-800/80 bg-slate-950/80 px-8 py-10 shadow-[0_28px_80px_rgba(0,0,0,0.85)]">
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.05),transparent_55%)]" />
        <div className="relative space-y-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-500">
            Mediehuset • Fun Firewall
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-50">
            Access denied.
          </h1>
          <p className="text-base text-slate-300">
            You do not match the description,{" "}
            <span className="font-semibold text-sky-300">{who}</span>.
          </p>
          <p className="text-sm text-slate-500">
            Only one seat unlocks the full screening. Choose wisely next time.
          </p>
          <div className="pt-4">
            <Link
              href="/landing"
              className="inline-flex items-center justify-center rounded-full border border-sky-500/70 bg-sky-500/10 px-6 py-2.5 text-base font-medium tracking-wide text-sky-100 hover:bg-sky-500/20 hover:border-sky-400/80 transition-colors duration-200"
            >
              Back to seat selection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunDeniedPage;