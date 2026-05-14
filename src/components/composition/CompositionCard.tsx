"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Trash2,
  Edit3,
  Share2,
  MapPin,
} from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { getUserId } from "@/lib/userId";
import { getBattleStyleShortLabel, getBattleStyleColor } from "@/lib/pokemon-utils";
import CompositionForm from "./CompositionForm";

interface SlotData {
  id: number;
  pokemonId: number;
  lane: string;
  sortOrder: number;
  pokemon: {
    id: number;
    nameJa: string;
    nameEn: string;
    slug: string;
    imageUrl: string | null;
    battleStyle: string;
  };
}

interface PokemonOption {
  id: number;
  nameJa: string;
  nameEn: string;
  imageUrl: string | null;
  battleStyle: string;
}

interface CompositionCardProps {
  id: number;
  title: string | null;
  description: string | null;
  upvotes: number;
  downvotes: number;
  guestId: string | null;
  slots: SlotData[];
  pokemons: PokemonOption[];
  onVote: (voteType: "upvote" | "downvote") => Promise<void>;
  onEdit: (data: { title: string; description: string; slots: { pokemonId: number; lane: string }[] }) => Promise<void>;
  onDelete?: () => Promise<void>;
}

const LANE_LABELS: Record<string, string> = {
  top: "上ルート",
  center: "中央エリア",
  bottom: "下ルート",
};

const LANE_ORDER = ["top", "center", "bottom"];

export default function CompositionCard({
  id,
  title,
  description,
  upvotes,
  downvotes,
  guestId,
  slots,
  pokemons,
  onVote,
  onEdit,
  onDelete,
}: CompositionCardProps) {
  const [activeVote, setActiveVote] = useState<"upvote" | "downvote" | null>(null);
  const [displayUpvotes, setDisplayUpvotes] = useState(upvotes);
  const [displayDownvotes, setDisplayDownvotes] = useState(downvotes);
  const [isVoting, setIsVoting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [currentUserGuestId, setCurrentUserGuestId] = useState<string | null>(null);

  const isOwner = currentUserGuestId != null && currentUserGuestId === guestId;
  const hasVoted = activeVote !== null;

  useEffect(() => {
    setCurrentUserGuestId(getUserId());
    setShareUrl(`${window.location.origin}/compositions`);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // ルートごとにスロットをグループ化
  const slotsByLane = useMemo(() => {
    const grouped: Record<string, SlotData[]> = {};
    for (const lane of LANE_ORDER) {
      grouped[lane] = slots.filter((s) => s.lane === lane);
    }
    return grouped;
  }, [slots]);

  // バトルスタイル集計
  const styleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const slot of slots) {
      const style = slot.pokemon.battleStyle;
      counts[style] = (counts[style] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [slots]);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (isVoting || hasVoted) return;
    setIsVoting(true);
    setActiveVote(voteType);
    if (voteType === "upvote") setDisplayUpvotes((prev) => prev + 1);
    else setDisplayDownvotes((prev) => prev + 1);

    try {
      await onVote(voteType);
    } catch (error) {
      setActiveVote(null);
      if (voteType === "upvote") setDisplayUpvotes(upvotes);
      else setDisplayDownvotes(downvotes);
      alert(error instanceof Error ? error.message : "投票に失敗しました");
    } finally {
      setIsVoting(false);
    }
  };

  const pokemonNames = slots.map((s) => s.pokemon.nameJa).join(", ");
  const tweetText = `${title || "チーム構成"}: ${pokemonNames}\n#ポケモンユナイト #構成メーカー`;

  if (isEditing) {
    return (
      <CompositionForm
        pokemons={pokemons}
        compositionId={id}
        initialTitle={title || ""}
        initialDescription={description || ""}
        initialSlots={slots.map((s) => ({
          pokemonId: s.pokemonId.toString(),
          lane: s.lane,
        }))}
        submitLabel="保存する"
        onSuccess={() => {
          setIsEditing(false);
          onEdit({
            title: title || "",
            description: description || "",
            slots: slots.map((s) => ({ pokemonId: s.pokemonId, lane: s.lane })),
          });
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  if (isDeleting) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl border-2 border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
          <Trash2 size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-1">
            この構成を削除しますか？
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            削除した構成は元に戻せません。
          </p>
        </div>
        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={() => {
              setIsDeleting(false);
              if (onDelete) onDelete();
            }}
            className="flex-1 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition"
          >
            削除する
          </button>
          <button
            onClick={() => setIsDeleting(false)}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-4 md:p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 relative">
      {/* ヘッダー: タイトル + メニュー */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-snug">
          {title || "無題の構成"}
        </h3>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Share2 size={14} />
          </a>
          {isOwner && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <MoreHorizontal size={16} />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-10">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsEditing(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <Edit3 size={14} />
                    <span>編集</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDeleting(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={14} />
                    <span>削除</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ルート別ポケモン表示 */}
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {LANE_ORDER.map((lane) => (
          <div key={lane} className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-2">
              <MapPin size={10} className="text-gray-400" />
              <span className="text-[10px] md:text-xs font-medium text-gray-500 dark:text-gray-400">
                {LANE_LABELS[lane]}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              {slotsByLane[lane]?.map((slot) => (
                <Link
                  key={slot.id}
                  href={`/pokemon/${slot.pokemon.slug}`}
                  className="flex flex-col items-center group"
                >
                  <div className="relative">
                    <Image
                      src={slot.pokemon.imageUrl || ""}
                      alt={slot.pokemon.nameJa}
                      width={44}
                      height={44}
                      className="rounded-full bg-gray-100 dark:bg-gray-700 object-cover border border-gray-200 dark:border-gray-600 shadow-sm group-hover:scale-110 transition-transform md:w-12 md:h-12"
                    />
                  </div>
                </Link>
              ))}
              {(!slotsByLane[lane] || slotsByLane[lane].length === 0) && (
                <span className="text-xs text-gray-300 italic">-</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* バトルスタイルバランス */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {styleCounts.map(([style, count]) => (
          <span
            key={style}
            className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium border ${getBattleStyleColor(style, true)}`}
          >
            {getBattleStyleShortLabel(style)} ×{count}
          </span>
        ))}
      </div>

      {/* 解説 */}
      {description && (
        <p className="text-sm text-gray-700 dark:text-gray-300 break-words whitespace-pre-wrap leading-relaxed">
          {description}
        </p>
      )}

      {/* 投票 */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700 justify-end">
        <button
          onClick={() => handleVote("upvote")}
          disabled={isVoting || hasVoted}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full border transition-all font-semibold text-sm ${
            activeVote === "upvote"
              ? "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
              : "bg-white border-gray-200 text-gray-600 hover:text-brand-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
          }`}
        >
          <ThumbsUp
            size={16}
            fill={activeVote === "upvote" ? "currentColor" : "none"}
          />
          <span>{displayUpvotes}</span>
        </button>
        <button
          onClick={() => handleVote("downvote")}
          disabled={isVoting || hasVoted}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full border transition-all font-semibold text-sm ${
            activeVote === "downvote"
              ? "bg-gray-100 border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600"
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
          }`}
        >
          <ThumbsDown
            size={16}
            fill={activeVote === "downvote" ? "currentColor" : "none"}
          />
          <span>{displayDownvotes}</span>
        </button>
      </div>
    </div>
  );
}
