"use client";
import { useState, useRef, useEffect } from "react";
import { ThumbsUp, ThumbsDown, MoreHorizontal, Trash2, Edit3, MessageCircleWarning, AlertTriangle, Bug } from "lucide-react";
import Image from "next/image";
import { getUserId } from "@/lib/userId";

interface BugReportCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  severity: string;
  status: string;
  upvotes: number;
  downvotes: number;
  pokemon?: {
    nameJa: string;
    imageUrl: string | null;
  } | null;
  guestId: string | null;
  onVote: (voteType: "upvote" | "downvote") => Promise<void>;
  onEdit: (title: string, description: string, severity: string, status: string) => Promise<void>;
  onDelete?: () => Promise<void>;
  isPastPatch?: boolean;
}

export default function BugReportCard({
  id,
  title,
  description,
  category,
  severity,
  status,
  upvotes,
  downvotes,
  pokemon,
  guestId,
  onVote,
  onEdit,
  onDelete,
  isPastPatch,
}: BugReportCardProps) {
  const [activeVote, setActiveVote] = useState<"upvote" | "downvote" | null>(null);
  const [displayUpvotes, setDisplayUpvotes] = useState(upvotes);
  const [displayDownvotes, setDisplayDownvotes] = useState(downvotes);
  const [isVoting, setIsVoting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description || "");
  const [editSeverity, setEditSeverity] = useState(severity);
  const [editStatus, setEditStatus] = useState(status);
  const [isEditSaving, setIsEditSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const menuRef = useRef<HTMLDivElement>(null);

  const [currentUserGuestId, setCurrentUserGuestId] = useState<string | null>(null);
  const isOwner = currentUserGuestId != null && currentUserGuestId === guestId;
  const hasVoted = activeVote !== null;

  useEffect(() => {
    setCurrentUserGuestId(getUserId());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (isVoting || hasVoted) return;
    setIsVoting(true);
    setActiveVote(voteType);
    if (voteType === "upvote") setDisplayUpvotes(prev => prev + 1);
    else setDisplayDownvotes(prev => prev + 1);

    try {
      await onVote(voteType);
    } catch (error) {
      setActiveVote(null);
      if (voteType === "upvote") setDisplayUpvotes(upvotes);
      else setDisplayDownvotes(downvotes);
      alert("投票に失敗しました");
    } finally {
      setIsVoting(false);
    }
  };

  const handleEditSave = async () => {
    setIsEditSaving(true);
    try {
      await onEdit(editTitle, editDescription, editSeverity, editStatus);
      setIsEditing(false);
    } catch (error) {
      alert("編集に失敗しました");
    } finally {
      setIsEditSaving(false);
    }
  };

  const SeverityBadge = ({ s }: { s: string }) => {
    if (s === "critical") return <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded border border-red-200"><AlertTriangle size={12}/> 致命的</span>;
    if (s === "normal") return <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded border border-orange-200"><Bug size={12}/> 通常</span>;
    if (s === "minor") return <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded border border-blue-200"><MessageCircleWarning size={12}/> 軽微</span>;
    return null;
  };

  const StatusBadge = ({ s }: { s: string }) => {
    if (s === "fixed") return <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">解消済み</span>;
    if (s === "confirmed") return <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">再現あり</span>;
    if (s === "resolved") return <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">仕様・解決</span>;
    return <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">情報募集中</span>;
  };

  const categoryLabel = category === "pokemon" ? "ポケモン関連" : category === "item" ? "もちもの関連" : category === "system" ? "システム" : "その他";

  if (isDeleting) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl border-2 border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
          <Trash2 size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-1">
            この報告を削除しますか？
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            削除したデータは元に戻せません。
          </p>
        </div>
        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={async () => {
              if (onDelete) await onDelete();
              setIsDeleting(false);
            }}
            className="flex-1 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition active:scale-95 shadow-sm"
          >
            削除する
          </button>
          <button
            onClick={() => setIsDeleting(false)}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition active:scale-95 shadow-sm"
          >
            戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl shadow-sm border ${(status === 'fixed' || status === 'resolved') ? 'border-green-300 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10 opacity-70' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>

      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-purple-600 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">{categoryLabel}</span>
          <SeverityBadge s={severity} />
          <StatusBadge s={status} />
        </div>
        
        {isOwner && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MoreHorizontal size={16} />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-10">
                <button onClick={() => { setIsMenuOpen(false); setIsEditing(true); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                  <Edit3 size={14} /><span>編集</span>
                </button>
                {!isPastPatch && (
                  <button onClick={() => { setIsMenuOpen(false); setIsDeleting(true); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                    <Trash2 size={14} /><span>削除</span>
                  </button>
                )}

              </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3 mt-3">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">ステータス:</span>
            <select value={editStatus} onChange={e => setEditStatus(e.target.value)} className="p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600">
              <option value="open">情報募集中</option>
              <option value="confirmed">再現あり</option>
              <option value="fixed">解消済み</option>
              <option value="resolved">仕様・解決</option>
            </select>
          </div>
          {!isPastPatch && (
            <>
              <input 
                type="text" 
                value={editTitle} 
                onChange={e => setEditTitle(e.target.value)} 
                className="w-full p-2 border rounded text-sm font-bold dark:bg-gray-700 dark:border-gray-600"
              />
              <select value={editSeverity} onChange={e => setEditSeverity(e.target.value)} className="p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600">
                <option value="critical">致命的</option>
                <option value="normal">通常</option>
                <option value="minor">軽微</option>
              </select>
              <textarea 
                value={editDescription} 
                onChange={e => setEditDescription(e.target.value)} 
                className="w-full p-2 border rounded text-sm min-h-[80px] dark:bg-gray-700 dark:border-gray-600"
              />
            </>
          )}
          <div className="flex gap-2">
            <button onClick={handleEditSave} disabled={isEditSaving} className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">保存</button>
            <button onClick={() => setIsEditing(false)} disabled={isEditSaving} className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm">キャンセル</button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {description || <span className="text-gray-400 italic">詳細なし</span>}
          </p>
          
          {pokemon && (
            <div className="mt-3 flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg inline-flex">
              <Image src={pokemon.imageUrl || ""} alt={pokemon.nameJa} width={24} height={24} className="rounded-full w-6 h-6 object-cover" />
              <span className="text-xs font-bold">{pokemon.nameJa}</span>
            </div>
          )}
        </>
      )}

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          「同症状あり」なら投票
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleVote("upvote")}
            disabled={isVoting || hasVoted || isPastPatch}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
              activeVote === "upvote" ? "bg-purple-100 border-purple-300 text-purple-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
            }`}
          >
            <ThumbsUp size={14} fill={activeVote === "upvote" ? "currentColor" : "none"} /> {displayUpvotes}
          </button>
        </div>
      </div>
    </div>
  );
}
