import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

// next.config.js
module.exports = {
    distDir: 'dist', // 将构建文件输出到 "build" 目录
};

export default withNextIntl(nextConfig);
