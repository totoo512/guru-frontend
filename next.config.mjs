/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
