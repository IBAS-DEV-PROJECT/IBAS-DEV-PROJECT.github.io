import { allPosts } from "contentlayer/generated";
import PostItem from "@/components/PostItem";

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
              <PostItem key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
