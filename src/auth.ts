import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  debug: true,
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    Twitter({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
      profile(profile: Record<string, unknown>) {
        // デバッグ: X APIからの生レスポンスをログ出力
        console.log("[auth] Twitter profile raw response:", JSON.stringify(profile, null, 2));
        const data = (profile.data as Record<string, unknown>) ?? profile;
        console.log("[auth] Parsed data:", JSON.stringify(data, null, 2));
        return {
          id: String(data.id),
          name: (data.name as string) ?? null,
          email: (data.email as string) ?? null,
          image: (data.profile_image_url as string) ?? null,
        };
      },
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
