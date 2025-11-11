import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const config: NextConfig = {
  // ★ Netlify 배포 (정적 빌드 제거 - API 라우트 지원 필요)
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'], // MDX 페이지 허용
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
};

export default withContentlayer(config);
