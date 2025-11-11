import { allPosts } from "contentlayer/generated";
import Link from "next/link";

export const metadata = {
  title: "블로그 통계 | IBAS Blog",
};

export default function StatsPage() {
  // 저자별 포스트 그룹화
  const postsByAuthor = allPosts.reduce(
    (acc, post) => {
      if (!acc[post.author]) {
        acc[post.author] = [];
      }
      acc[post.author].push(post);
      return acc;
    },
    {} as Record<string, typeof allPosts>
  );

  // 태그별 포스트 그룹화
  const postsByTag = allPosts.reduce(
    (acc, post) => {
      (post.tags || []).forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = [];
        }
        acc[tag].push(post);
      });
      return acc;
    },
    {} as Record<string, typeof allPosts>
  );

  const totalPosts = allPosts.length;
  const authors = Object.entries(postsByAuthor);
  const tags = Object.entries(postsByTag).sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="space-y-12">
      {/* 헤더 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">블로그 통계</h1>
          <Link
            href="/admin"
            className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            ← CMS로 돌아가기
          </Link>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          팀의 블로그 기여도와 통계를 확인하세요.
        </p>
      </div>

      {/* 전체 통계 */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            총 포스트
          </div>
          <div className="text-3xl font-bold">{totalPosts}</div>
        </div>
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            기여자
          </div>
          <div className="text-3xl font-bold">{authors.length}</div>
        </div>
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            태그
          </div>
          <div className="text-3xl font-bold">{tags.length}</div>
        </div>
      </section>

      {/* 저자별 기여도 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">👥 저자별 기여도</h2>
        <div className="space-y-3">
          {authors
            .sort((a, b) => b[1].length - a[1].length)
            .map(([author, posts]) => (
              <div
                key={author}
                className="rounded-lg border border-slate-200 dark:border-slate-800 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{author}</span>
                  <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                    {posts.length}개
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition"
                    style={{ width: `${(posts.length / totalPosts) * 100}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 포스트 목록 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">📝 전체 포스트</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="text-left p-4 font-semibold">제목</th>
                <th className="text-left p-4 font-semibold">저자</th>
                <th className="text-left p-4 font-semibold">작성일</th>
                <th className="text-left p-4 font-semibold">태그</th>
              </tr>
            </thead>
            <tbody>
              {allPosts
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((post) => (
                  <tr
                    key={post.slug}
                    className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    <td className="p-4">
                      <a
                        href={`/posts/${post.slug}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {post.title}
                      </a>
                    </td>
                    <td className="p-4">{post.author}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {new Date(post.date).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 flex-wrap">
                        {(post.tags || []).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 태그별 분석 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">🏷️ 인기 태그</h2>
        <div className="flex flex-wrap gap-3">
          {tags.map(([tag, posts]) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full text-sm"
            >
              #{tag}
              <span className="ml-2 font-semibold">{posts.length}</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
