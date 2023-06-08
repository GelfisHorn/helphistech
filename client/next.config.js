/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* async redirects() {
    return [
      {
        source: '/',
        destination: '/web-seiten',
        permanent: true
      }
    ]
  }, */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
    ],
  },
}

module.exports = nextConfig