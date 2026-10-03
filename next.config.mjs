/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    // The app has two root layouts (ru and en), so the 404 page brings its own.
    globalNotFound: true,
  },
};

export default nextConfig;
