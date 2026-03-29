"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { LogOut, LogIn } from "lucide-react";

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-8 h-8 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full"></div>;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
            {session.user.name?.[0]?.toUpperCase() || "U"}
          </div>
        )}
        
        <button
          onClick={() => signOut()}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition p-1"
          aria-label="ログアウト"
          title="ログアウト"
        >
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("twitter")}
      className="flex items-center gap-2 text-sm font-medium bg-black text-white hover:bg-gray-800 transition px-3 py-1.5 rounded-full"
    >
      <LogIn size={14} />
      <span>Xでログイン</span>
    </button>
  );
}
