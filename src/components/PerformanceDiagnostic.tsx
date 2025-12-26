import { useEffect } from "react";

export function PerformanceDiagnostic() {
  useEffect(() => {
    try {
      console.log("🚀 Running responsive + performance diagnostics...");

      // Smooth scroll behavior
      document.documentElement.style.scrollBehavior = "smooth";

      // Responsive image optimization
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        try {
          (img as HTMLImageElement).loading = "lazy";
          (img as HTMLImageElement).decoding = "async";
          (img as HTMLImageElement).style.maxWidth = "100%";
          (img as HTMLImageElement).style.height = "auto";
        } catch {}
      });

      // Test viewport breakpoints
      const breakpoints = {
        mobile: window.matchMedia("(max-width: 640px)"),
        tablet: window.matchMedia("(max-width: 1024px)"),
        desktop: window.matchMedia("(min-width: 1025px)")
      } as const;
      Object.entries(breakpoints).forEach(([key, query]) => {
        if (query.matches) console.log(`📱 Active viewport: ${key}`);
      });

      // Detect heavy layout shifts
      if ("PerformanceObserver" in window) {
        let layoutShifts = 0;
        const po = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as PerformanceEntryList) {
            const anyEntry = entry as any;
            if (typeof anyEntry.value === "number" && anyEntry.value > 0.1) layoutShifts++;
          }
          if (layoutShifts > 3) {
            console.warn("⚠️ Excessive layout shifts detected, consider reducing motion.");
          }
        });
        try {
          po.observe({ type: "layout-shift", buffered: true });
        } catch {}
      }

      // Lazy load fade-in animation
      const fadeSelector = "[data-motion], [data-fade], [data-rise]";
      const fadeEls = document.querySelectorAll<HTMLElement>(fadeSelector);
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              el.style.transition = "opacity 0.8s ease";
              el.style.opacity = "1";
            }
          });
        },
        { threshold: 0.2 }
      );
      fadeEls.forEach((el) => {
        el.style.opacity = "0";
        io.observe(el);
      });

      console.log("✅ Performance lock active — Ready for export!");

      return () => {
        try {
          io.disconnect();
        } catch {}
      };
    } catch (e) {
      console.warn("PerformanceDiagnostic init skipped:", e);
    }
  }, []);

  return null;
}

export default PerformanceDiagnostic;
