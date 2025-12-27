import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import Layout from "@/components/Layout";
import { ReactiveOverlay } from "@/components/ReactiveOverlay";
import { MicroPolish } from "@/components/MicroPolish";
import { CinematicMotion } from "@/components/CinematicMotion";
import LoadingFade from "@/components/LoadingFade";
import { MetaTags } from "@/components/MetaTags";
import { VisualQAPolish } from "@/components/VisualQAPolish";
import { PerformanceDiagnostic } from "@/components/PerformanceDiagnostic";
import { LaunchChecklist } from "@/components/LaunchChecklist";
import ConcertKillSwitch from "@/components/ConcertKillSwitch";
import { GlobalErrorBoundary } from "@/components/GlobalErrorBoundary";
import { LazyMotion, domAnimation } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  // Removed global scroll hooks - moved to specific pages that need them
  return (
    <GlobalErrorBoundary>
      <LazyMotion features={domAnimation} strict>
        <ThemeProvider>
          <ConcertKillSwitch />
          <MetaTags />
          <LoadingFade />
          <ReactiveOverlay />
          <CinematicMotion />
          <MicroPolish />
          {/* <SoMeMindsetEnhancer /> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <VisualQAPolish />
          <PerformanceDiagnostic />
          <LaunchChecklist />
          <Analytics />
        </ThemeProvider>
      </LazyMotion>
    </GlobalErrorBoundary>
  );
}
