import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user: {
      login?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    accessToken?: string;
    login?: string;
  }
}
