/** @type {import('next').NextConfig} */
import { createRequire } from "module";

// Check if element-tagger is available
function isElementTaggerAvailable() {
  try {
    const require = createRequire(import.meta.url);
    require.resolve("@softgenai/element-tagger");
    return true;
  } catch {
    return false;
  }
}

// Build turbo rules only if tagger is available
function getTurboRules() {
  if (!isElementTaggerAvailable()) {
    console.log("[Softgen] Element tagger not found, skipping loader configuration");
    return {};
  }

  return {
    "*.tsx": {
      loaders: ["@softgenai/element-tagger"],
      as: "*.tsx",
    },
    "*.jsx": {
      loaders: ["@softgenai/element-tagger"],
      as: "*.jsx",
    },
  };
}

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: getTurboRules(),
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "sg-b6f2b92d-8212-44cf-ba50-88a04322.vercel.app",
      },
    ],
  },
  allowedDevOrigins: ["*.daytona.work", "*.softgen.dev"],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://my.spline.design https://prod.spline.design https://www.youtube.com https://www.dropbox.com; script-src 'self' 'unsafe-eval' 'unsafe-inline'; worker-src 'self' blob:;"
          }
        ],
      },
    ];
  },
};

export default nextConfig;
