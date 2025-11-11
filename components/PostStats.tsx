"use client";

import { useEffect, useState } from "react";

interface PostStatsProps {
  slug: string;
}

export default function PostStats({ slug }: PostStatsProps) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const viewKey = `post-views-${slug}`;
    const viewCount = localStorage.getItem(viewKey);
    setViews(parseInt(viewCount || "0"));
  }, [slug]);

  if (views === 0) return null;

  return (
    <span className="text-xs text-slate-500 dark:text-slate-400">
      👁️ {views}
    </span>
  );
}
