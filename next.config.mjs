/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'www.freecodecamp.org' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },    
      { protocol: 'https', hostname: 'www.svgrepo.com' },
    ],
  },
};

export default nextConfig;