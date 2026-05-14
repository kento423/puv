"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil, Loader2 } from "lucide-react";

interface StatEditCellProps {
  pokemonId: number;
  statId: number;
  level: number;
  currentValue: number | null;
  unit?: string;
  onSaved?: () => void;
}

export default function StatEditCell({
  pokemonId,
  statId,
  level,
  currentValue,
  unit = "",
  onSaved,
}: StatEditCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(
    currentValue !== null ? String(currentValue) : ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // currentValue が外部から変更されたら同期
  useEffect(() => {
    if (!isEditing) {
      setInputValue(currentValue !== null ? String(currentValue) : "");
    }
  }, [currentValue, isEditing]);

  const handleSave = async () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed) || parsed < 0) {
      setIsEditing(false);
      setInputValue(currentValue !== null ? String(currentValue) : "");
      return;
    }

    // 値が変わっていなければスキップ
    if (currentValue !== null && parsed === currentValue) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      // guestId を localStorage から取得
      let guestId = "";
      if (typeof window !== "undefined") {
        guestId = localStorage.getItem("uc-guest-id") || "";
        if (!guestId) {
          guestId = crypto.randomUUID();
          localStorage.setItem("uc-guest-id", guestId);
        }
      }

      const res = await fetch("/api/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pokemonId,
          statId,
          level,
          value: parsed,
          guestId,
        }),
      });

      if (!res.ok) {
        throw new Error("保存に失敗しました");
      }

      setIsEditing(false);
      onSaved?.();
    } catch (error) {
      console.error("Failed to save stat:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setInputValue(currentValue !== null ? String(currentValue) : "");
    }
  };

  if (isSaving) {
    return (
      <span className="inline-flex items-center justify-center text-gray-400">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      </span>
    );
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="number"
        step="any"
        min="0"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        className="w-20 px-1.5 py-0.5 text-right text-sm border border-purple-300 dark:border-purple-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="group inline-flex items-center gap-1 text-right hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
      title="クリックして編集"
    >
      {currentValue !== null ? (
        <span className="font-medium text-gray-900 dark:text-white">
          {currentValue}{unit}
        </span>
      ) : (
        <span className="text-gray-400 dark:text-gray-500 italic text-xs">
          N/A
        </span>
      )}
      <Pencil className="w-3 h-3 text-gray-300 dark:text-gray-600 group-hover:text-purple-500 transition-colors opacity-0 group-hover:opacity-100" />
    </button>
  );
}
