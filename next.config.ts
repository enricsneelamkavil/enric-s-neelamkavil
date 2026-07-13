import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    // Next.js 16 defaults to only allowing quality=75 for next/image's
    // `quality` prop (a new images.qualities allowlist) — 90 is added here
    // for MapSection.tsx's avatar images, which need higher quality since
    // they're heavily downscaled from 800x800 source photos to ~40px display.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rdkhdnbzhuwvthxagzdz.supabase.co',
        pathname: '/storage/v1/object/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
      },
    ],
  },
};

export default nextConfig;
