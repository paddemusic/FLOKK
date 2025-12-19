import Head from "next/head";

export function MetaTags() {
  return (
    <Head>
      <title>Patrick: Creative Force | Music, Content & Design</title>
      <meta
        name="description"
        content="Patrick bygger broer mellom teknologi og følelser, med ord, bilder og lyd. Innholdsutvikler, artist og historieforteller med 300M+ visninger og 250K følgere."
      />
      <meta name="author" content="Patrick" />
      <meta name="theme-color" content="#e50914" />

      <meta property="og:title" content="Patrick: Creative Force" />
      <meta
        property="og:description"
        content="Innholdsutvikler, artist og historieforteller. Jeg bygger broer mellom teknologi og følelser, med ord, bilder og lyd."
      />
      <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Patrick: Creative Force" />
      <meta
        name="twitter:description"
        content="Strategisk historieforteller og kreativ kraft bak musikk, video og markedsføring."
      />
      <meta name="twitter:image" content="https://yourdomain.com/og-image.jpg" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}

export default MetaTags;