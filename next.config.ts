// Force restart - sync prisma models
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    qualities: [25, 50, 65, 75, 85, 100],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Removed transpilePackages and serverExternalPackages to let dynamic import handle it
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/about', destination: '/about-us', permanent: true },
      { source: '/contact', destination: '/contact-us', permanent: true },
      { source: '/services/service-details', destination: '/services', permanent: true },
      { source: '/service-details.html', destination: '/services', permanent: true },
      { source: '/case-studies/case-study-details', destination: '/case-studies', permanent: true },
      { source: '/case-study-details.html', destination: '/case-studies', permanent: true },
    ];
  },
};

export default nextConfig;
