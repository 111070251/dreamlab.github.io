/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/dreamlab.github.io',
  images: {
    unoptimized: true,
  },
  // 禁用服务器端功能
  experimental: {
    appDir: true,
  },
  env: {
    NEXTAUTH_URL: 'https://111070251.github.io/dreamlab.github.io',
  },
  // 关闭严格模式以避免开发时的双重渲染
  reactStrictMode: false,
}

module.exports = nextConfig 