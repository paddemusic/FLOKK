export interface Project {
  id: string;
  title: string;
  category: "Kampanjer" | "Video" | "AI" | "Musikk";
  description: string;
  thumbnail: string;
  link: string;
  year: string;
  client?: string;
  views?: string;
}

export const projects: Project[] = [
  {
    id: "podcast-2025",
    title: "Podcast",
    category: "AI",
    description: "AI-drevet konseptutvikling og lydproduksjon for digitalt format.",
    thumbnail: "/softgen_vibecoded.webp",
    link: "https://www.dropbox.com/scl/fo/oa5ftuyaavrrwtbog12y6/APaqXCea79CykqWu7qG4gqY?rlkey=krn091auy8i55k3frudndb04w&st=6vu6488q&dl=0",
    year: "2025",
  },
  {
    id: "album-2025",
    title: "Album",
    category: "Musikk",
    description: "Helhetlig prosjekt med musikk, video og visuell identitet under eget artistnavn.",
    thumbnail: "/cover.webp",
    link: "https://open.spotify.com/artist/5IdCpGeu22vX9cXMCdpGWp",
    year: "2025",
  },
  {
    id: "video-some-2024",
    title: "Video prosjekt SoMe",
    category: "Video",
    description: "Produksjon av korte videoformater for sosiale medier med fokus på historiefortelling og tempo.",
    thumbnail: "/Screenshot_2024-09-27_at_18.25.44.webp",
    link: "https://www.youtube.com/watch?v=YtkKr-cDzSk",
    year: "2024",
  },
  {
    id: "annonsering-2024",
    title: "Annonsering",
    category: "Kampanjer",
    description: "Utvikling og testing av betalte kampanjer i Meta Suite og Google Ads.",
    thumbnail: "/Screenshot_2023-12-10_at_14.22.26.webp",
    link: "#",
    year: "2024",
  },
  {
    id: "podcast-2024",
    title: "Podcast",
    category: "Video",
    description: "Podkastserie med fokus på kreativitet og samarbeid mellom skapere.",
    thumbnail: "/Youtube_thumbnail_podcast_01_v2.webp",
    link: "https://www.youtube.com/watch?v=Ai0znYcHO2Q&t=3s",
    year: "2024",
  },
  {
    id: "nettside-2023",
    title: "Nettsideutvikling",
    category: "Kampanjer",
    description: "Design og utvikling av nettsted for kundeprosjekt med fokus på brukeropplevelse og visuell helhet.",
    thumbnail: "/Screenshot_2024-09-27_at_18.10.39.webp",
    link: "https://www.laselva.no",
    year: "2023",
  },
  {
    id: "youtube-2022",
    title: "YouTube prosjekt",
    category: "Video",
    description: "Innholdsserie produsert for YouTube med redaksjonelt fokus og målgruppeoptimalisering.",
    thumbnail: "/Screenshot_2024-01-27_at_23.35.27.webp",
    link: "https://www.youtube.com/channel/UCESa3cR1szCpFl662Dt-YCw",
    year: "2022",
  },
  {
    id: "snapchat-tv2-2021",
    title: "Snapchat serie 2021 (TV 2)",
    category: "Video",
    description: "Serie produsert for TV 2 Snapchat med kombinasjon av humor, dokumentar og kortformat innhold.",
    thumbnail: "/broslo.webp",
    link: "https://www.dropbox.com/scl/fi/e2vk1ykl22x2thy7044v9/EP1.mp4?rlkey=fc5nx8j7tjetz2pfdpit5jfps&dl=0",
    year: "2021",
    client: "TV 2",
  },
  {
    id: "stories-tv2-2022",
    title: "Stories 2022 (TV 2)",
    category: "Kampanjer",
    description: "SoMe-produksjoner for TV 2 kampanjer med fokus på engasjerende historiefortelling i vertikalt format.",
    thumbnail: "/bislett.webp",
    link: "https://www.dropbox.com/scl/fo/tb9qyoxz7recw7gmzq6ig/h?rlkey=el7cso97n3tbyqf9w7xmc4ku6&dl=0",
    year: "2022",
    client: "TV 2",
  },
  {
    id: "valg-tv2-2023",
    title: "Valg 2023 (TV 2 case)",
    category: "Kampanjer",
    description: "Digital kampanje og visuelt innhold for dekning av valg 2023.",
    thumbnail: "/Screenshot_2024-01-28_at_00.45.07.webp",
    link: "https://www.dropbox.com/scl/fi/4lzrnx19kh5av8mu9ir1w/Copy-of-tv2_plan_Instagram-vekst.pdf?rlkey=3hjtv0uq29al4aw7inrmw1vjg&dl=0",
    year: "2023",
    client: "TV 2",
  },
  {
    id: "video-2015-2018",
    title: "Video prosjekt",
    category: "Video",
    description: "Tidlige uavhengige videoprosjekter med fokus på musikk og historiefortelling.",
    thumbnail: "/Screen_Shot_2017-10-11_at_4.16.35_PM.webp",
    link: "https://www.youtube.com/channel/UCESa3cR1szCpFl662Dt-YCw",
    year: "2015 til 2018",
  },
  {
    id: "personlige-2015-2021",
    title: "Personlige prosjekt",
    category: "Musikk",
    description: "Eget kunstnerisk arbeid innen design, musikk og eksperimentell film.",
    thumbnail: "/Logo_sko.webp",
    link: "https://www.dropbox.com/scl/fi/bdaafm9tp2uwm2jsbvlzy/PJ_presskit_2024.pdf?rlkey=348fxxbb3geheu93a4v90i3n3&dl=0",
    year: "2015 til 2021",
  },
];

export const categories = ["Alle", "Kampanjer", "Video", "AI", "Musikk"] as const;
export type Category = typeof categories[number];