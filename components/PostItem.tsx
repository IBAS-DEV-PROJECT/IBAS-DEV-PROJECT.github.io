"use client";

import Link from "next/link";
import PostStats from "./PostStats";

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  summary?: string;
  tags?: string[];
}

export default function PostItem({ post }: { post: Post }) {
  return (
    <article className="group rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition">
      <Link href={`/posts/${post.slug}`} className="space-y-3 block">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition flex-1">
            {post.title}
          </h3>
          <PostStats slug={post.slug} />
        </div>

        <p className="text-slate-600 dark:text-slate-400">
          {post.summary || ""}
        </p>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span>{new Date(post.date).toLocaleDateString("ko-KR")}</span>
            <span>{post.author}</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap justify-end">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
