/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Keep a running dev server from overwriting production build artifacts.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: { unoptimized: true },
};

export default nextConfig;
