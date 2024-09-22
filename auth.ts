import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          scope: "read:user user:email repo read:org",
        },
      },
    }),
  ],
  pages: {
    signIn: "/app",
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, trigger, account, user }) {
      if (trigger === "signIn" && account) {
        token.accessToken = account.access_token;
      }

      if (trigger === "update" && user) {
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (typeof token.accessToken === "string") {
        session.accessToken = token.accessToken;
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
