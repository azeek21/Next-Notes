/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/redirect-to-home",
        destination: '/',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
