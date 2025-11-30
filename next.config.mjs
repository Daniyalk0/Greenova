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
    ],
  },
};

export default nextConfig;
