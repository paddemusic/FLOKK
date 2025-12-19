import { useEffect } from "react";

/**
 * Non-invasive kill-switch: CSS-only hiding of concert images and neutralizing backgrounds.
 * No DOM node replacements to avoid React reconciliation conflicts.
 */
export function ConcertKillSwitch() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      img[src*="Kickstart"], img[src*="kickstart"], img[src*="konsert"], img[src*="/Kickstart_konsert"],
      img[src*="sg-b6f2b92d-8212-44cf-ba50-88a04322.vercel.app/Kickstart"] { display: none !important; }
      [style*="Kickstart"], [style*="kickstart"], [style*="konsert"],
      [style*="sg-b6f2b92d-8212-44cf-ba50-88a04322.vercel.app/Kickstart"] { background-image: none !important; }
      [data-nobg="true"] { position: relative; z-index: 0; }
    `;
    document.head.appendChild(style);

    // Mark problem sections as nobg so fixed layers (if any) are visually muted by CSS
    const markNoBg = () => {
      const nodes = Array.from(document.querySelectorAll("section, div"));
      nodes.forEach((el) => {
        const t = (el.textContent || "").toLowerCase();
        if (
          t.includes("bak hvert klipp finnes et blikk") ||
          t.includes("hvis teknologi bygger strukturen")
        ) {
          el.setAttribute("data-nobg", "true");
        }
      });
    };
    markNoBg();
    window.addEventListener("scroll", markNoBg, { passive: true });

    return () => {
      window.removeEventListener("scroll", markNoBg);
    };
  }, []);

  return null;
}

export default ConcertKillSwitch;
