
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1c1c1c" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="FREND — Patrick Jørgensen" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@p4trickofficial" />
        
        <link rel="canonical" href="https://frend.vercel.app" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
