import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  // ログイン必須ではないため、とりあえずデフォルトの設定で
  callbacks: {
    session({ session, user }) {
      // ユーザーIDをセッションに含める
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
