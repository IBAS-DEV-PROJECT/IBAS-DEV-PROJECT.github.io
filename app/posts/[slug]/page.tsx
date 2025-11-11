import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import type { Metadata } from "next";
import Link from "next/link";
import PostInteraction from "@/components/PostInteraction";
import Comments from "@/components/Comments";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다",
    };
  }

  return {
    title: post.title,
    description: post.summary || post.title,
    authors: [{ name: post.author }],
    keywords: post.tags || [],
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="max-w-3xl mx-auto py-8">
      {/* 뒤로가기 */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 mb-8"
      >
        <span>←</span>
        <span>목록으로 돌아가기</span>
      </Link>

      {/* 헤더 */}
      <header className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.author}</span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {post.summary && (
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">
            {post.summary}
          </p>
        )}
      </header>

      {/* 커버 이미지 */}
      {post.cover && (
        <div className="mb-8">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full rounded-lg object-cover"
          />
        </div>
      )}

      {/* 본문 */}
      <div className="prose dark:prose-invert max-w-none mb-12">
        <MDXContent />
      </div>

      {/* 상호작용 */}
      <PostInteraction slug={post.slug} title={post.title} />

      {/* 댓글 */}
      <Comments slug={post.slug} />
    </article>
  );
}
