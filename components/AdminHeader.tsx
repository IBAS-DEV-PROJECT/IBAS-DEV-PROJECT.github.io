"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 왼쪽: 블로그로 돌아가기 */}
          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          >
            ← 블로그로 돌아가기
          </Link>

          {/* 오른쪽: 글쓰기, 로그아웃 */}
          <div className="flex items-center gap-6">
            {session ? (
              <>
                <Link
                  href="/write"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  ✍️ 글 작성
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
              >
                GitHub 로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
