"use client";

import { useEffect, useState } from "react";

interface SpotifyPlayerProps {
  artistId?: string;
  className?: string;
}

export function SpotifyPlayer({ 
  artistId = "5IdCpGeu22vX9cXMCdpGWp",
  className = ""
}: SpotifyPlayerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show placeholder until mounted
  if (!isMounted) {
    return (
      <div 
        className={`h-[180px] w-full bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse ${className}`}
        style={{ minHeight: "180px" }}
        aria-label="Loading Spotify player..."
      />
    );
  }

  return (
    <div 
      className={`relative ${className}`}
      style={{
        minHeight: "180px",
        width: "100%",
        pointerEvents: "auto",
        zIndex: 10
      }}
    >
      <iframe
        className="w-full rounded-xl"
        src={`https://open.spotify.com/embed/artist/${artistId}?theme=0`}
        width="100%"
        height="352"
        frameBorder="0"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        title="Patrick Jørgensen – Spotify"
        suppressHydrationWarning
        style={{
          pointerEvents: "auto",
          minHeight: "180px",
          display: "block"
        }}
      />
    </div>
  );
}