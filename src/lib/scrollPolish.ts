
import { useEffect } from "react";

export const useScrollPolish = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    // Cache elements and their speeds to avoid repeated DOM queries
    const elementsCache: Array<{ element: HTMLElement; speed: number }> = [];
    const parallaxElements = document.querySelectorAll("[data-parallax]");

    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-parallax") || "0.2");
      elementsCache.push({ element: el as HTMLElement, speed });
    });

    let rafId: number | null = null;
    let isRunning = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;

      elementsCache.forEach(({ element, speed }) => {
        const yOffset = scrollY * speed;
        element.style.transform = `translateY(${yOffset}px)`;
      });

      isRunning = false;
    };

    const handleScroll = () => {
      if (isRunning) return;

      isRunning = true;
      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);
};
