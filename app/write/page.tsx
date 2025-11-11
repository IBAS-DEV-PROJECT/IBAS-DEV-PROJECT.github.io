import { auth } from "@/auth";
import { redirect } from "next/navigation";
import WriteForm from "@/components/WriteForm";

export const metadata = {
  title: "글 작성 | IBAS Blog",
};

export default async function WritePage() {
  const session = await auth();

  // 로그인하지 않으면 홈으로 리다이렉트
  if (!session) {
    redirect("/");
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">새 글 작성</h1>
        <p className="text-slate-600 dark:text-slate-400">
          {session.user?.name}님, 새로운 글을 작성해주세요!
        </p>
      </div>

      <WriteForm />
    </div>
  );
}
