"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Ban, Bug as BugIcon, Plus } from "lucide-react";
import MetaPostCard from "@/components/meta/MetaPostCard";
import MetaPostForm from "@/components/meta/MetaPostForm";
import BanPickCard from "@/components/meta/BanPickCard";
import BanPickForm from "@/components/meta/BanPickForm";
import BugReportCard from "@/components/meta/BugReportCard";
import BugReportForm from "@/components/meta/BugReportForm";
import { getUserId } from "@/lib/userId";

export interface PokemonOpt {
  id: number;
  nameJa: string;
  nameEn: string;
  imageUrl: string | null;
  slug: string;
  battleStyle: string;
}

// Data sources come from parent Server Component props
interface MetaBoardClientProps {
  pokemons: PokemonOpt[];
  // raw data from actions
  metaPosts: any[];
  banPicks: any[];
  bugReports: any[];
  activePatch: any;
  allPatches: any[];
}

export default function MetaBoardClient({
  pokemons,
  metaPosts,
  banPicks,
  bugReports,
  activePatch,
  allPatches,
}: MetaBoardClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTabState] = useState<"meta" | "ban" | "bug">("meta");
  const [showForm, setShowForm] = useState(false);

  // Sync state with URL params on mount or when URL changes
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "meta" || tab === "ban" || tab === "bug") {
      setActiveTabState(tab);
    }
  }, [searchParams]);

  const setActiveTab = (tab: "meta" | "ban" | "bug") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`/meta?${params.toString()}`, { scroll: false });
    setActiveTabState(tab);
  };

  // metaPosts grouping (just display them in order for now as they are sorted by upvotes)
  // Let's divide Ban picks by side "first" vs "second"
  const firstBanPicks = banPicks.filter(b => b.side === "first");
  const secondBanPicks = banPicks.filter(b => b.side === "second");

  const [banSideActive, setBanSideActive] = useState<"first"|"second">("first");

  const activeBans = banSideActive === "first" ? firstBanPicks : secondBanPicks;

  const handleVote = async (type: "meta"|"ban"|"bug", id: number, voteType: "upvote"|"downvote") => {
    // Call corresponding vote API
    const res = await fetch(`/api/${type}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        [`${type}PostId`]: id, // meta uses metaPostId but api expects metaPostId
        voteType,
        userId: getUserId(),
      }),
    });
    // In a real app we might handle local optimistic updates without full reload,
    // but the API calls revalidateTag so Next.js will refresh data in the background or next nav.
    // For now we'll rely on the Card's internal optimistic state + router refresh eventually
    if (!res.ok) throw new Error("Vote failed");
  };

  const handleDelete = async (type: "meta"|"ban"|"bug", id: number) => {
    const res = await fetch(`/api/${type}?${type === 'meta' ? 'postId' : type === 'ban' ? 'pickId' : 'reportId'}=${id}&guestId=${getUserId()}`, {
      method: "DELETE"
    });
    if (res.ok) {
      router.refresh();
      setShowForm(false);
    } else {
      alert("Delete failed");
    }
  };

  const handleEditMeta = async (id: number, reason: string, tier: string) => {
    const res = await fetch(`/api/meta`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: id, reason, tier, guestId: getUserId() }),
    });
    if (!res.ok) throw new Error("Edit failed");
    router.refresh();
  };

  const handleEditBan = async (id: number, reason: string, side: string) => {
    const res = await fetch(`/api/ban`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pickId: id, reason, side, guestId: getUserId() }),
    });
    if (!res.ok) throw new Error("Edit failed");
    router.refresh();
  };
  
  const handleEditBug = async (id: number, title: string, description: string, severity: string, status: string) => {
    const res = await fetch(`/api/bug`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId: id, title, description, severity, status, guestId: getUserId() }),
    });
    if (!res.ok) throw new Error("Edit failed");
    router.refresh();
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      {/* Mobile-friendly Tabs */}
      <div className="flex overflow-x-auto snap-x hide-scrollbar border-b border-gray-200 dark:border-gray-700 mb-6 bg-white dark:bg-gray-900 sticky top-14 z-40 md:top-[68px]">
        <button
          onClick={() => { setActiveTab("meta"); setShowForm(false); }}
          className={`flex-none snap-start px-4 md:px-6 py-4 flex items-center justify-center gap-2 font-bold text-sm md:text-base whitespace-nowrap transition-all border-b-2 ${
            activeTab === "meta"
              ? "border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400"
              : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          <Sparkles size={18} /> 環境ポケモン
        </button>
        <button
          onClick={() => { setActiveTab("ban"); setShowForm(false); }}
          className={`flex-none snap-start px-4 md:px-6 py-4 flex items-center justify-center gap-2 font-bold text-sm md:text-base whitespace-nowrap transition-all border-b-2 ${
            activeTab === "ban"
              ? "border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400"
              : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          <Ban size={18} /> BAN候補
        </button>
        <button
          onClick={() => { setActiveTab("bug"); setShowForm(false); }}
          className={`flex-none snap-start px-4 md:px-6 py-4 flex items-center justify-center gap-2 font-bold text-sm md:text-base whitespace-nowrap transition-all border-b-2 ${
            activeTab === "bug"
              ? "border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400"
              : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          <BugIcon size={18} /> バグ報告
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row items-center justify-between p-3 md:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30 gap-3">
        <span className="text-purple-600 dark:text-purple-400 font-bold text-sm md:text-base whitespace-nowrap">
          対象パッチ
        </span>
        <select
          value={activePatch?.id || ""}
          onChange={(e) => {
            const patchId = e.target.value;
            const params = new URLSearchParams(searchParams.toString());
            if (patchId) params.set("patchId", patchId);
            else params.delete("patchId");
            router.push(`/meta?${params.toString()}`);
          }}
          className="w-full md:w-auto p-2 border border-purple-200 dark:border-purple-800 rounded bg-white dark:bg-gray-800 text-sm font-semibold text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500"
        >
          {allPatches.map((p) => (
            <option key={p.id} value={p.id}>
              {p.version} {p.isActive ? "(最新)" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        {activePatch && activePatch.isActive === false ? (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-sm text-gray-500 dark:text-gray-400">
            過去のパッチ情報を表示しています。新規の投稿や提案は最新のパッチでのみ可能です。
          </div>
        ) : !showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-sm hover:bg-purple-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            {activeTab === "meta" ? "環境ポケモンを投稿" : activeTab === "ban" ? "BAN候補を提案" : "バグを報告する"}
          </button>
        ) : (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            {activeTab === "meta" && (
              <MetaPostForm pokemons={pokemons} onSuccess={() => { router.refresh(); setShowForm(false); }} onCancel={() => setShowForm(false)} />
            )}
            {activeTab === "ban" && (
              <BanPickForm pokemons={pokemons} defaultSide={banSideActive} onSuccess={() => { router.refresh(); setShowForm(false); }} onCancel={() => setShowForm(false)} />
            )}
            {activeTab === "bug" && (
              <BugReportForm pokemons={pokemons} onSuccess={() => { router.refresh(); setShowForm(false); }} onCancel={() => setShowForm(false)} />
            )}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {activeTab === "meta" && (
          <div className="space-y-4">
            {metaPosts.length === 0 ? (
              <p className="text-center text-gray-500 py-10">まだ投稿がありません</p>
            ) : (
              <ul className="space-y-4">
                {metaPosts.map(post => (
                  <MetaPostCard
                    key={`meta-${post.id}`}
                    {...post}
                    isPastPatch={activePatch && activePatch.isActive === false}
                    onVote={(t: "upvote" | "downvote") => handleVote("meta", post.id, t)}
                    onEdit={(r: string, t: string) => handleEditMeta(post.id, r, t)}
                    onDelete={() => handleDelete("meta", post.id)}
                  />
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "ban" && (
          <div className="space-y-4">
            <div className="flex bg-gray-100 p-1 rounded-lg dark:bg-gray-800 w-full max-w-xs mx-auto mb-6">
               <button 
                 onClick={() => setBanSideActive("first")}
                 className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-colors ${banSideActive === "first" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900"}`}
               >先攻</button>
               <button 
                 onClick={() => setBanSideActive("second")}
                 className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-colors ${banSideActive === "second" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900"}`}
               >後攻</button>
            </div>
            
            {activeBans.length === 0 ? (
              <p className="text-center text-gray-500 py-10">まだ提案がありません</p>
            ) : (
              <ul className="space-y-6">
                {activeBans.map((pick, i) => (
                  <BanPickCard
                    key={`ban-${pick.id}`}
                    {...pick}
                    isPastPatch={activePatch && activePatch.isActive === false}
                    onVote={(t: "upvote" | "downvote") => handleVote("ban", pick.id, t)}
                    onEdit={(r: string, s: string) => handleEditBan(pick.id, r, s)}
                    onDelete={() => handleDelete("ban", pick.id)}
                  />
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "bug" && (
          <div className="space-y-4">
            {bugReports.length === 0 ? (
              <p className="text-center text-gray-500 py-10">バグ報告はありません</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bugReports.map(report => (
                  <BugReportCard
                    key={`bug-${report.id}`}
                    {...report}
                    isPastPatch={activePatch && activePatch.isActive === false}
                    onVote={(t: "upvote" | "downvote") => handleVote("bug", report.id, t)}
                    onEdit={(t: string, d: string, s: string, status: string) => handleEditBug(report.id, t, d, s, status)}
                    onDelete={() => handleDelete("bug", report.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
