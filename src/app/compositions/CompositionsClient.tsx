"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { getUserId } from "@/lib/userId";
import CompositionForm from "@/components/composition/CompositionForm";
import CompositionCard from "@/components/composition/CompositionCard";
import type { CompositionListItem } from "@/app/actions/composition";

interface PokemonOption {
  id: number;
  nameJa: string;
  nameEn: string;
  imageUrl: string | null;
  battleStyle: string;
}

interface CompositionsClientProps {
  pokemons: PokemonOption[];
  compositions: CompositionListItem[];
}

export default function CompositionsClient({
  pokemons,
  compositions: initialCompositions,
}: CompositionsClientProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = useCallback(() => {
    setShowForm(false);
    router.refresh();
  }, [router]);

  const handleVote = useCallback(
    async (compositionId: number, voteType: "upvote" | "downvote") => {
      const res = await fetch("/api/compositions/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          compositionId,
          voteType,
          userId: getUserId(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "投票に失敗しました");
      }
    },
    []
  );

  const handleEdit = useCallback(
    async () => {
      // 編集の保存はCompositionForm内で直接APIを呼ぶので、
      // ここではリフレッシュだけ行う
      router.refresh();
    },
    [router]
  );

  const handleDelete = useCallback(
    async (compositionId: number) => {
      try {
        const res = await fetch("/api/compositions", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            compositionId,
            guestId: getUserId(),
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "削除に失敗しました");
        }

        router.refresh();
      } catch (error) {
        alert(error instanceof Error ? error.message : "削除に失敗しました");
      }
    },
    [router]
  );

  return (
    <div className="space-y-6">
      {/* 投稿ボタン / フォーム */}
      {showForm ? (
        <CompositionForm
          pokemons={pokemons}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-purple-400 hover:text-purple-600 dark:hover:border-purple-500 dark:hover:text-purple-400 transition-all bg-white/50 dark:bg-gray-800/50"
        >
          <Plus size={20} />
          <span className="font-medium">構成を作成する</span>
        </button>
      )}

      {/* 一覧 */}
      {initialCompositions.length === 0 ? (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">
          <p className="text-lg font-medium mb-2">まだ構成がありません</p>
          <p className="text-sm">
            最初の構成を投稿して、コミュニティに共有しましょう
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {initialCompositions.map((comp) => (
            <CompositionCard
              key={comp.id}
              id={comp.id}
              title={comp.title}
              description={comp.description}
              upvotes={comp.upvotes}
              downvotes={comp.downvotes}
              guestId={comp.guestId}
              slots={comp.slots}
              pokemons={pokemons}
              onVote={(voteType) => handleVote(comp.id, voteType)}
              onEdit={handleEdit}
              onDelete={() => handleDelete(comp.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
