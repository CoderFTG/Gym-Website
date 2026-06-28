/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for Hostinger shared hosting (Path B).
  // Produces a fully static `out/` folder — no Node server required.
  output: "export",

  // Static export cannot use the on-demand Image Optimization server,
  // so images are served as-is. Remote demo photos come from Unsplash.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Emit `/about/index.html` style paths so links work on static hosts
  // without server-side routing rewrites.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
