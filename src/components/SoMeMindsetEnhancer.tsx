import React, { useEffect } from "react";

/** Public, non-duplicated assets (no Kickstart/konsert) */
const CDN = "https://sg-b6f2b92d-8212-44cf-ba50-88a04322.vercel.app";
const BG_SoMe = `${CDN}/IMG_6205.jpg`; // soft, wide, cinematic
const BTS = [
  `${CDN}/IMG_5010.jpg`,
  `${CDN}/IMG_5011.jpg`,
  `${CDN}/IMG_5022.jpg`,
  `${CDN}/IMG_5026.jpg`,
  `${CDN}/patrick_bts-22.jpg`,
  `${CDN}/patrick_bts-25.jpg`,
  `${CDN}/patrick_bts-8.jpg`,
];

function uniqueUnusedBTS(sources: string[]): string[] {
  try {
    const existing = Array.from(document.querySelectorAll("img"))
      .map((img) => (img.getAttribute("src") || "").toLowerCase())
      .filter(Boolean);
    const set = new Set(existing);
    const picks: string[] = [];
    sources.forEach((src) => {
      const key = src.toLowerCase();
      if (!set.has(key) && !picks.includes(src)) {
        picks.push(src);
      }
    });
    return picks.slice(0, 6);
  } catch {
    return sources.slice(0, 6);
  }
}

function injectSoMeSection() {
  const allSections = Array.from(document.querySelectorAll("section, div"));
  const target = allSections.find((el) => {
    const t = (el.textContent || "").toLowerCase();
    return (
      t.includes("some-mindset") ||
      t.includes("so me-mindset") ||
      t.includes("some mindset") ||
      t.includes("some‑mindset") ||
      t.includes("some mindset")
    );
  });
  if (!target) return;

  target.setAttribute("data-nobg", "true");
  target.innerHTML = `
    <div class="somemindset-wrapper fade-in-smooth">
      <div class="somemindset-bg" aria-hidden="true"></div>
      <div class="somemindset-overlay" aria-hidden="true"></div>
      <div class="somemindset-content">
        <h2>SoMe-mindset</h2>
        <p>
          Strategi i ryggmargen, tempo i fingertuppene. Jeg lager innhold som
          føles naturlig i feeden, og som faktisk blir sett.
        </p>
        <ul class="somemindset-points">
          <li>Idé → klipp → tekst → publisering</li>
          <li>TikTok &amp; Reels: hook, beat &amp; retention</li>
          <li>Organisk først, paid som forsterker</li>
          <li>Iterasjon på innsikt, ikke magefølelse</li>
        </ul>
      </div>
    </div>
  `;

  if (!document.getElementById("somemindset-styles")) {
    const style = document.createElement("style");
    style.id = "somemindset-styles";
    style.innerHTML = `
      .somemindset-wrapper{position:relative;isolation:isolate;min-height:520px;border-radius:16px;overflow:hidden}
      .somemindset-bg{position:absolute;inset:0;background:url('${BG_SoMe}') center/cover no-repeat;filter:blur(12px) saturate(1.05) brightness(0.82);transform:scale(1.06)}
      .somemindset-overlay{position:absolute;inset:0;background:radial-gradient(120% 120% at 50% 30%, rgba(0,0,0,0.15), rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.9) 90%)}
      .somemindset-content{position:relative;z-index:2;max-width:900px;margin:0 auto;padding:72px 24px;color:#f2f2f2;text-align:center}
      .somemindset-content h2{font-size:clamp(1.6rem,2.6vw,2.2rem);letter-spacing:-.01em;margin-bottom:12px}
      .somemindset-content p{color:#d5d5d5;margin:0 auto 18px;max-width:720px;line-height:1.6}
      .somemindset-points{display:grid;gap:8px;grid-template-columns:repeat(2,minmax(0,1fr));max-width:760px;margin:0 auto}
      .somemindset-points li{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:10px 12px;border-radius:10px}
      @media (max-width: 768px){
        .somemindset-wrapper{min-height:480px}
        .somemindset-points{grid-template-columns:1fr}
      }
      @keyframes fadeInSmooth{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
      .fade-in-smooth{animation:fadeInSmooth .8s ease-out both}
    `;
    document.head.appendChild(style);
  }
}

function injectBTSStrip() {
  const anchors = Array.from(document.querySelectorAll("h2,h3")).filter((h) => {
    const t = (h.textContent || "").toLowerCase();
    return t.includes("bak kameraet") || t.includes("origins & evolution") || t.includes("opprinnelse & utvikling");
  });
  const anchor = anchors[0]?.closest("section") || anchors[0]?.parentElement;
  if (!anchor) return;
  if (document.querySelector("#bts-alt-strip")) return;

  const pics = uniqueUnusedBTS(BTS);
  const wrapper = document.createElement("div");
  wrapper.id = "bts-alt-strip";
  wrapper.className = "bts-alt-wrapper fade-in-smooth";
  wrapper.innerHTML = `
    <div class="bts-grid">
      ${pics
        .map(
          (src) => `
        <figure class="bts-item">
          <img src="${src}" alt="Behind the scenes" loading="lazy" decoding="async"/>
        </figure>`
        )
        .join("")}
    </div>
  `;
  anchor.insertAdjacentElement("afterend", wrapper);

  if (!document.getElementById("bts-alt-styles")) {
    const style = document.createElement("style");
    style.id = "bts-alt-styles";
    style.innerHTML = `
      .bts-alt-wrapper{max-width:1280px;margin:48px auto 12px;padding:0 16px}
      .bts-grid{display:grid;gap:16px;grid-template-columns:repeat(3,minmax(0,1fr))}
      .bts-item{border-radius:12px;overflow:hidden;background:#0a0a0a;border:1px solid rgba(255,255,255,0.06)}
      .bts-item img{display:block;width:100%;height:auto;object-fit:contain;transition:transform .45s ease, opacity .4s ease;background:#000}
      .bts-item:hover img{transform:scale(1.02);opacity:.98}
      @media (max-width: 1024px){ .bts-grid{grid-template-columns:repeat(2,minmax(0,1fr))} }
      @media (max-width: 640px){ .bts-grid{grid-template-columns:1fr} }
    `;
    document.head.appendChild(style);
  }
}

function tightenGlobalSpacing() {
  document.querySelectorAll("section").forEach((sec) => {
    const cs = getComputedStyle(sec);
    const pt = parseInt(cs.paddingTop || "0", 10);
    const pb = parseInt(cs.paddingBottom || "0", 10);
    if (pt > 120) (sec as HTMLElement).style.paddingTop = Math.round(pt * 0.75) + "px";
    if (pb > 120) (sec as HTMLElement).style.paddingBottom = Math.round(pb * 0.75) + "px";
  });
}

export default function SoMeMindsetEnhancer(): JSX.Element | null {
  useEffect(() => {
    try {
      injectSoMeSection();
      injectBTSStrip();
      tightenGlobalSpacing();
    } catch {
      // swallow to avoid disrupting UI
    }
  }, []);
  return null;
}