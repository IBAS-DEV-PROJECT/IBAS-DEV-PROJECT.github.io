import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "IBAS 기술 블로그",
  description: "IBAS 팀의 기술 블로그 - 개발 경험, 트러블슈팅, 프로젝트 회고를 공유합니다.",
  authors: [{ name: "IBAS DEV Team" }],
  keywords: ["기술", "블로그", "개발", "Next.js", "TypeScript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <SessionProvider>
          <Header />
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="border-t border-slate-200 dark:border-slate-800 mt-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-600 dark:text-slate-400">
              <p>&copy; 2025 IBAS Development Team. All rights reserved.</p>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
