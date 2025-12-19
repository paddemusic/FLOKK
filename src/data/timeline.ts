export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  highlights?: string[];
  type: "work" | "education" | "freelance";
}

export const timeline: TimelineItem[] = [
  {
    id: "softgen",
    year: "2025 – nå",
    title: "Innholdsprodusent / Teamleder",
    company: "Softgen AI",
    description:
      "Ledet et kreativt team på tvers av medieproduksjon, strategi og AI‑assistert innhold. Ansvarlig for konseptutvikling, publisering og produksjonsflyt.",
    highlights: [
      "AI‑drevne innholdsprosjekter og eksperimenter i SoMe‑markedsføring",
      "Utviklet intern prosess for AI‑assistert innholdsproduksjon",
      "Strategi og produksjon for podkast og videoinnhold"
    ],
    type: "work"
  },
  {
    id: "tv2",
    year: "2021 – 2023",
    title: "Medierådgiver",
    company: "TV 2",
    description:
      "Ansvarlig for innholdsproduksjon, kampanjeutvikling og digital markedsføring (betalt og organisk). Deltok i lansering av nye programmer og kreative formater.",
    highlights: [
      "Kampanjer for programmer på TV 2 Play og YouTube",
      "Strategi, idé, regi, tekst og klipp",
      "Koordinering mellom redaksjon, markedsavdeling og eksterne byråer"
    ],
    type: "work"
  },
  {
    id: "freelance-creator",
    year: "2015 – 2022",
    title: "Artisteri, videoproduksjon og markedsføring",
    company: "Selvstendig næringsdrivende",
    description:
      "Drevent kreative prosjekter innen musikk, video og digital markedsføring. Over 300 millioner avspillinger, 250 000 følgere og 8 000 merch‑salg.",
    highlights: [
      "Lanseringsstrategier, innholdsproduksjon og samarbeid med medier og promotører"
    ],
    type: "freelance"
  },
  {
    id: "bi-job",
    year: "2014 – 2015",
    title: "PR & kommunikasjonsmedarbeider",
    company: "Handelshøyskolen BI",
    description: "PR‑ og kommunikasjonsarbeid, arrangement og markedsføring.",
    type: "work"
  },
  {
    id: "lefdal",
    year: "2014 – 2015",
    title: "Salg og kommunikasjon",
    company: "Lefdal / Spaceworld",
    description: "Kundeservice, produktkunnskap, og markedskommunikasjon.",
    type: "work"
  },
  {
    id: "education",
    year: "2011 – 2015",
    title: "PR & Mediekommunikasjon + Film & Video",
    company:
      "BI Bergen, Academy of Art University (San Francisco) og McNally Smith College of Music",
    description: "Tverrfaglig utdanning innen kommunikasjon, film, musikk og strategisk historiefortelling.",
    type: "education"
  }
];
