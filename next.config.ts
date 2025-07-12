import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com', // Untuk gambar Unsplash
      'plus.unsplash.com'    // Domain alternatif Unsplash
    ],
  },
  
  experimental: {
    appDir: true,
  }
};

export default nextConfig;
