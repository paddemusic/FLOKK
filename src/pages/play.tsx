import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import React from "react";

const ENABLED =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_ENABLE_SPLINE_PLAYGROUND === "true";

interface LocalErrorBoundaryProps {
  children: React.ReactNode;
  onError?: () => void;
}

interface LocalErrorBoundaryState {
  hasError: boolean;
}

class LocalErrorBoundary extends React.Component<
  LocalErrorBoundaryProps,
  LocalErrorBoundaryState
> {
  constructor(props: LocalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    if (typeof this.props.onError === "function") this.props.onError();
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <h1 className="text-xl font-semibold text-white">Playground couldn’t load</h1>
        <p className="text-white/70 max-w-md">
          The interactive scene failed to load in this preview. Try refresh — or open in another browser/device. Desktop
          works best.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-full border border-white/20 text-white hover:border-white/40"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
          <Link className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/15" href="/">
            Back to site
          </Link>
        </div>
      </div>
    );
  }
}

type SplineComponentType = (props: { scene: string }) => JSX.Element;

async function loadSplineComponent(): Promise<SplineComponentType> {
  const importer = new Function('return import("@splinetool/react-spline/next")') as () => Promise<{
    default: SplineComponentType;
  }>;
  const mod = await importer();
  return mod.default;
}

function DisabledPlaceholder() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-white text-xl font-semibold">Spline playground temporarily disabled</h1>
        <p className="text-white/70 mt-2">
          This route is behind a safety switch. Enable it via{" "}
          <span className="text-white/90">NEXT_PUBLIC_ENABLE_SPLINE_PLAYGROUND=true</span>.
        </p>
        <div className="mt-5 flex gap-3 justify-center">
          <button
            type="button"
            className="inline-flex px-4 py-2 rounded-full border border-white/20 text-white hover:border-white/40"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
          <Link className="inline-flex px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/15" href="/">
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PlayPage() {
  const [mounted, setMounted] = useState(false);

  const splineOff = useMemo(() => {
    if (typeof window === "undefined") return false;
    const sp = new URLSearchParams(window.location.search);
    return sp.get("spline") === "off";
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6 text-center">
        <div className="text-white/70 text-sm">Loading…</div>
      </div>
    );
  }

  if (splineOff) return <DisabledPlaceholder />;

  return (
    <div className="min-h-screen bg-black">
      <div className="px-6 py-4 flex items-center justify-between max-w-screen-2xl mx-auto">
        <Link className="text-white/80 hover:text-white" href="/">
          ← Back to site
        </Link>
        <Link className="text-white/60 hover:text-white/80 text-sm" href="/play?spline=off">
          Safe mode
        </Link>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 pb-10">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
          <div className="relative w-full" style={{ height: "80vh", minHeight: "700px" }}>
            <iframe
              src="https://my.spline.design/gamewhacathief-4PclVm0IgTe8FimIEsPn8Gvw/"
              frameBorder="0"
              width="100%"
              height="100%"
              style={{
                background: "transparent",
                border: "none",
                display: "block"
              }}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
              title="Interactive Spline Scene - Playground"
            />
          </div>
        </div>

        <p className="mt-4 text-white/50 text-sm text-center">
          Interactive 3D scene - click and drag to explore
        </p>
      </div>
    </div>
  );
}