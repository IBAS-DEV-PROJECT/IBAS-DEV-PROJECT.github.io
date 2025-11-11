"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

interface PostContentProps {
  code: string;
}

export default function PostContent({ code }: PostContentProps) {
  const MDXContent = useMDXComponent(code);
  return (
    <div className="prose dark:prose-invert max-w-none mb-12">
      <MDXContent />
    </div>
  );
}
