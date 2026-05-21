// Next.js設定 - App Router使用、画像最適化はVercelデプロイを前提
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // プレースホルダー画像をローカルpublicから参照するため外部ドメイン設定不要
    unoptimized: false,
  },
};

export default nextConfig;
