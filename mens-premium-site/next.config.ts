import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  experimental: {
    // React 19 + Next.js 15 — sem necessidade de peerDependencyCheck
    reactCompiler: false,
  },
}

export default config
