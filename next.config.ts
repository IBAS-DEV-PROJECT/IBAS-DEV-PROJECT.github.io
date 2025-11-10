import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const config: NextConfig = {
  output: 'export', // ★ GitHub Pages용 정적 내보내기
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'], // MDX 페이지 허용
};

export default withContentlayer(config);
