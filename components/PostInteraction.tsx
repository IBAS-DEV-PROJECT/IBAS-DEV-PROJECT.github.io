"use client";

import { useState, useEffect } from "react";

interface PostInteractionProps {
  slug: string;
  title: string;
}

export default function PostInteraction({ slug, title }: PostInteractionProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = `post-like-${slug}`;

  useEffect(() => {
    // 클라이언트 사이드에서만 로컬스토리지 접근
    const savedLikes = localStorage.getItem(`post-likes-${slug}`);
    const userLiked = localStorage.getItem(storageKey);

    setLikes(savedLikes ? parseInt(savedLikes) : 0);
    setHasLiked(!!userLiked);
    setIsLoading(false);
  }, [slug, storageKey]);

  const handleLike = () => {
    setHasLiked(!hasLiked);

    if (!hasLiked) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      localStorage.setItem(`post-likes-${slug}`, newLikes.toString());
      localStorage.setItem(storageKey, "true");
    } else {
      const newLikes = Math.max(0, likes - 1);
      setLikes(newLikes);
      localStorage.setItem(`post-likes-${slug}`, newLikes.toString());
      localStorage.removeItem(storageKey);
    }
  };

  const handleShareTwitter = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const twitterUrl = `https://twitter.com/intent/tweet?text="${title}" - IBAS Blog&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다!");
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="py-8 border-t border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {/* 좋아요 */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            hasLiked
              ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <span className="text-xl">{hasLiked ? "❤️" : "🤍"}</span>
          <span className="text-sm font-medium">
            좋아요 ({likes > 0 ? likes : 0})
          </span>
        </button>

        {/* 트위터 공유 */}
        <button
          onClick={handleShareTwitter}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <span>𝕏</span>
          <span className="text-sm font-medium">공유</span>
        </button>

        {/* 링크 복사 */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <span>🔗</span>
          <span className="text-sm font-medium">복사</span>
        </button>
      </div>
    </div>
  );
}
