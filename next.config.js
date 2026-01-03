/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 🔥 PENTING: pastikan APP ROUTER AKTIF
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
