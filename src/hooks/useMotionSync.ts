
import { useEffect } from "react";

export function useMotionSync() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-fade],[data-rise]");
    if (items.length === 0) return;

    let rafId: number | null = null;
    let isRunning = false;

    const reveal = () => {
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.85;

      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < threshold && rect.bottom > 0;

        if (inView) {
          el.classList.add("visible");
        } else {
          el.classList.remove("visible");
        }
      });

      isRunning = false;
    };

    const handleScroll = () => {
      if (isRunning) return;

      isRunning = true;
      rafId = requestAnimationFrame(reveal);
    };

    reveal(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);
}
