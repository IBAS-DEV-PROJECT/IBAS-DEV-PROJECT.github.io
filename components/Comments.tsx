"use client";

import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl font-bold mb-8">댓글</h2>
      <Giscus
        id={`giscus-${slug}`}
        repo="IBAS-DEV-PROJECT/IBAS-DEV-PROJECT.github.io"
        repoId="R_kgDONBpGnQ"
        category="Comments"
        categoryId="DIC_kwDONBpGnc4Cm-Wh"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
