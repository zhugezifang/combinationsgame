import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'dist', // 自定义构建目录
};

export default withNextIntl(nextConfig);
