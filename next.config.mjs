/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Supabase storage
      {
        protocol: 'https',
        hostname: 'lzpbentohychvxyxgqmx.supabase.co',
        pathname: '/**',
      },
      // PNGimg.com images
      {
        protocol: 'https',
        hostname: 'pngimg.com',
        pathname: '/**',
      },
      // Wikimedia images
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.nicepng.com',
        pathname: '/**',
      },
    ],
  },
   experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // or "20mb"
    },
  },
};

export default nextConfig;
