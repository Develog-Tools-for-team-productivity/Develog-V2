import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
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
