import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Lets app/global-not-found.tsx style the 404 page even though the root layout is [lang]
  experimental: {
    globalNotFound: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
