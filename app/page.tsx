import Link from "next/link";
import { allPosts } from "contentlayer/generated";

export default function Home() {
  // 최신순으로 정렬
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">IBAS 기술 블로그</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          팀의 개발 경험, 트러블슈팅, 프로젝트 회고를 공유합니다.
        </p>
      </section>

      {sortedPosts.length === 0 ? (
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-8 text-center">
          <p className="text-slate-600 dark:text-slate-400">아직 포스트가 없습니다.</p>
        </div>
      ) : (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">최신 포스트</h2>
          <div className="grid gap-6 md:gap-8">
            {sortedPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition"
              >
                <Link href={`/posts/${post.slug}`} className="space-y-3 block">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {post.title}
                    </h3>
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
                      <div className="flex gap-2 flex-wrap">
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
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
