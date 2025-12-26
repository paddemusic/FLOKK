const BASE = "https://sg-b6f2b92d-8212-44cf-ba50-88a04322.vercel.app";

export const brand = {
  hero: `${BASE}/Artboard_10.png`,
  tv2Logo: `${BASE}/TV_2_Logo.png`,
} as const;

export const artboards = {
  artboard2: `${BASE}/Artboard_2.png`,
  artboard3: `${BASE}/Artboard_3.png`,
  artboard10: `${BASE}/Artboard_10.png`,
  artboard14: `${BASE}/Artboard_14.png`,
  artboard34: `${BASE}/Artboard_34.png`,
  artboard40: `${BASE}/Artboard_40.png`,
  artboard57: `${BASE}/Artboard_57.png`,
} as const;

export const bts = {
  bts6: `${BASE}/patrick_bts-6.jpg`,
  bts8: `${BASE}/patrick_bts-8.jpg`,
  bts13: `${BASE}/patrick_bts-13.jpg`,
  bts22: `${BASE}/patrick_bts-22.jpg`,
  bts25: `${BASE}/patrick_bts-25.jpg`,
} as const;

export const kickstart = {
  kickstart7: `${BASE}/Kickstart_konsert-7.jpg`,
  kickstart16: `${BASE}/Kickstart_konsert-16.jpg`,
  kickstart17: `${BASE}/Kickstart_konsert-17.jpg`,
  kickstart18: `${BASE}/Kickstart_konsert-18.jpg`,
} as const;

export const brandItems = {
  truckerHat: `${BASE}/trucker-hat-navy-blue.png`,
  patrickLogo: `${BASE}/Patrick_Transparent_Black_Clean.png`,
  pjPromo: `${BASE}/PJ_Promo_1080x1080_clean.png`,
} as const;

export const media = {
  ...brand,
  ...artboards,
  ...bts,
  ...kickstart,
  ...brandItems,
  // Aliases for compatibility with sections
  patrick6: bts.bts6,
  tv2logo: brand.tv2Logo,
  pjpromo: brandItems.pjPromo,
  // New aliases for concert imagery
  concert16: kickstart.kickstart16,
  concert18: kickstart.kickstart18
} as const;

export default media;
