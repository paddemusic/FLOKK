
import { useEffect } from "react";

export const useScrollPolish = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll("[data-parallax]");
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax") || "0.2");
        const yOffset = window.scrollY * speed;
        (el as HTMLElement).style.transform = `translateY(${yOffset}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};
  