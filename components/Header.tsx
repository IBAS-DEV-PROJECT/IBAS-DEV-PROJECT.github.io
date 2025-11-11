"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-slate-600 dark:hover:text-slate-300">
          📚 IBAS Blog
        </Link>
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Link
                href="/write"
                className="text-sm px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition font-semibold"
              >
                ✍️ 글 작성
              </Link>
              <Link
                href="/admin/stats"
                className="text-sm px-4 py-2 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
              >
                📊 통계
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm px-4 py-2 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn("github")}
                className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
              >
                GitHub 로그인
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
