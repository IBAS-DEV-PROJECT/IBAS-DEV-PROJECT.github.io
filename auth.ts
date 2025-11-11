import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.login = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken as string | undefined;
      session.user.login = token.login as string | undefined;
      return session;
    },
    async authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      // /write, /api/posts는 로그인 필요
      if (pathname.startsWith("/write") || pathname.startsWith("/api/posts")) {
        return !!auth;
      }
      return true;
    },
  },
});
