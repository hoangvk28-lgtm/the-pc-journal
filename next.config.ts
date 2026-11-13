import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Cloudflare Pages: fully static export. Headers/redirects live in public/_headers and public/_redirects.
  output: "export",
  trailingSlash: false,
  // Pin the workspace root explicitly. An unrelated stray lockfile at
  // /home/admin1/package-lock.json was making Next.js infer the workspace
  // root as the whole home directory instead of this project folder,
  // which made the dev server trace/watch far more of the filesystem
  // than it needed to (contributing to the dev-server memory blowups).
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: path.join(__dirname),
  },
  // Type-checking already runs locally (`npx tsc --noEmit`) before every push per the
  // pre-commit gate. With 1600+ static guide pages, Next's in-build tsc pass was taking
  // long enough to hit the Vercel Hobby plan's ~45min build timeout, causing build errors
  // and backing up the deploy queue. Skip the redundant in-build check.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
};

export default nextConfig;

