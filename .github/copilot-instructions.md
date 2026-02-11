# Copilot Instructions for Pokemon Unite Counter Database

## プロジェクト概要

このプロジェクト（PUV）は、ポケモンユナイト対戦相手の対策情報を共有・投票するデータベースアプリケーションです。

**主な特徴:**

- Next.js 15 + TypeScript による SSR/CSR ハイブリッド構成
- Prisma を使用したデータベース管理（SQLite）
- 日本語対応の UI
- ポケモンの対策情報（カウンター）を登録・編集・投票可能
- 複数属性（ダメージクラス、レンジタイプ、バトルスタイル）によるフィルタリング機能

## アーキテクチャと重要なディレクトリ構成

```
src/
├── app/
│   ├── page.tsx              # ホームページ
│   ├── pokemon/
│   │   ├── page.tsx          # ポケモン一覧ページ（クライアント側フィルタリング）
│   │   └── [slug]/           # 個別ポケモン詳細ページ
│   │       ├── page.tsx
│   │       ├── PokemonInfo.tsx              # ポケモン名・画像・説明表示
│   │       ├── PokemonAttributesTags.tsx    # 基本情報タグ・カスタムタグ表示
│   │       ├── PokemonPageClient.tsx        # 3タブコンテンツの管理
│   │       └── components/
│   │           ├── PokemonTabs.tsx          # タブUI・タブ切り替え管理
│   │           ├── AddCounterForm.tsx       # 対策追加フォーム
│   │           ├── ReverseCounterList.tsx   # Tab: 対策できる相手（逆向きカウンター）
│   │           ├── StatRadarChartTab.tsx    # Tab: ステータス詳細
│   │           └── ...
│   └── api/
│       └── pokemon/
│           ├── route.ts              # ポケモン一覧API
│           ├── counter/              # 対策情報CRUD
│           ├── [slug]/
│           │   ├── route.ts          # ポケモン詳細API（カスタムタグ含む）
│           │   ├── counters/         # 特定ポケモンの対策一覧
│           │   ├── reverse-counters/ # 逆向きカウンター一覧（このポケモンを対策するポケモン）
│           │   ├── tags/
│           │   │   ├── route.ts      # カスタムタグ追加（POST）
│           │   │   └── [tagId]/
│           │   │       └── route.ts  # カスタムタグ削除（DELETE）
│           │   └── [tagId]/ (deprecated)
│           └── vote/                 # 投票機能
├── components/
│   ├── CandidateCard.tsx          # 単一対策カード（投票・編集機能付き）
│   ├── CandidateCardList.tsx      # 対策一覧
│   ├── StatRadarChart.tsx         # ステータスレーダーチャート
│   └── ui/                        # shadcn/ui コンポーネント
└── lib/
    └── userId.ts             # ローカルストレージのユーザーID管理
```

## 開発時の重要なパターンと規則

### 1. **API エンドポイント設計**

- GET `/api/pokemon` - フィルタリング機能付きポケモン一覧
  - クエリパラメータ: `search`, `damageClass`, `rangeType`, `battleStyle`, `excludeSlug`
  - WHERE 条件を動的に構築
- GET `/api/pokemon/[slug]` - ポケモン詳細（カスタムタグ込み）
  - `include: { customTags: { include: { tag: true } } }` でタグ取得
- GET `/api/pokemon/[slug]/counters` - 特定ポケモンの対策情報
- GET `/api/pokemon/[slug]/reverse-counters` - このポケモンを対策するポケモン一覧（逆向きカウンター）
- POST `/api/pokemon/[slug]/tags` - カスタムタグ追加
- DELETE `/api/pokemon/[slug]/tags/[tagId]` - カスタムタグ削除（動的ルート）
- POST `/api/pokemon/vote` - 投票機能（ユーザー ID ベース）
- PATCH `/api/pokemon/counter` - 対策内容の編集

### 2. **クライアント・サーバー通信パターン**

```typescript
// 例：PokemonPageClient.tsx のパターン
const handleVote = async (counterId, voteType) => {
  const userId = getUserId();
  const res = await fetch("/api/pokemon/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      targetPokemonId,
      counterPokemonId: counterId,
      voteType,
      userId,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    if (res.status === 409) throw new Error("既に投票済み");
  }
  await fetchCounters(); // 再取得
};
```

### 3. **ローカルストレージの管理**

- `lib/userId.ts` でユーザー ID を自動生成・保持
- 投票の重複防止に使用
- localStorage キー: 確認が必要な場合は該当ファイルを参照

### 4. **フォーム操作の UI パターン**

- `showForm` 状態で表示/非表示を切り替え
- キャンセル時は入力をリセット
- 成功時は親の `onAdded` / `onFetchCounters` コールバックで更新

### 5. **エラーハンドリング**

- API エラーは try-catch で捕捉、ユーザーフレンドリーなメッセージ表示
- 409 ステータスは重複投票検出
- 非同期処理の完了前に UI 更新を行わない

## UI/スタイリング規則

### **スマホファーストな UI 設計**

本プロジェクトは**スマホファーストなアプローチ**を採用しています。以下のガイドラインに従ってください：

#### **レスポンシブデザイン原則**

- **モバイル優先**: 基本スタイルはモバイル（320px〜767px）向けに設計
- **タブレット対応**: `md:` ブレークポイント（768px〜）で段階的に拡張
- **デスクトップ対応**: `lg:` ブレークポイント（1024px〜）でさらに最適化
- **幅の制限**: デスクトップでも無制限に広がらないよう注意（現在は`w-full`でコンテナに合わせる設計）

#### **タッチ操作への最適化**

- **ボタンサイズ**: 最小タップ領域 44×44px (モバイル時)
  - パディング: `py-2.5 md:py-2` でモバイル時に大きくする
- **ボタンのスタイリング**:
  ```jsx
  className = "py-2.5 md:py-2 px-4 md:px-6 active:scale-95 transition-all";
  // active:scale-95 で押下フィードバック
  ```
- **入力フィールド**: `py-2.5 md:py-2` でモバイル時に高さを確保
- **スペーシング**: `gap-3 md:gap-4` や `space-y-3 md:space-y-4` で密度を調整

#### **フォント・テキストサイズ**

- **見出し**: `text-2xl md:text-3xl lg:text-4xl`
- **本文**: `text-sm md:text-base`
- **ラベル**: `text-xs md:text-sm`
- **ボタンテキスト**: `text-sm md:text-base`

#### **ダークモード対応**

- Tailwind の `dark:` プリフィックスで対応
- 背景: `bg-white dark:bg-gray-800` または `dark:bg-gray-900`
- テキスト: `text-gray-900 dark:text-white` または `text-gray-600 dark:text-gray-400`
- ボーダー: `border-gray-200 dark:border-gray-700`

#### **レイアウトパターン**

**フレックスレイアウト（フロー切り替え）:**

```jsx
className = "flex flex-col md:flex-row gap-3 md:gap-4";
// モバイル: 縦積み、タブレット以上: 横並び
```

**グリッドレイアウト:**

```jsx
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4";
// モバイル: 1列、タブレット: 2列、デスクトップ: 4列
```

**画像レスポンシブ:**

```jsx
className = "w-14 h-14 md:w-16 md:h-16";
// モバイル: 56×56px、タブレット: 64×64px
```

#### **具体的なコンポーネント例**

**カード類:**

```jsx
className =
  "p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700";
```

**ボタン:**

```jsx
className =
  "w-full md:w-auto px-4 md:px-6 py-2.5 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all font-medium text-sm md:text-base";
```

**フォーム（検索・セレクト）:**

```jsx
className =
  "w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 text-sm";
```

### **その他のスタイリング規則**

- **Tailwind CSS** を使用
- **アイコン**: lucide-react から import（ThumbsUp, ThumbsDown, SquarePen など）
- **色分け規則**:
  - ダメージクラス: physical=オレンジ, special=緑
  - レンジタイプ: melee=オレンジ, ranged=緑
  - バトルスタイル: attacker=赤, all-rounder=紫, defender=緑, speedster=青, supporter=黄

## データモデル（重要）

**Pokemon（ポケモンマスタ）:**

- id, slug, nameJa, nameEn, imageUrl
- damageClass (physical/special)
- rangeType (melee/ranged)
- battleStyle (attacker/all-rounder/defender/speedster/supporter)

**PokemonCounter（対策情報）:**

- id, targetPokemonId, counterPokemonId, reason
- upvotes, downvotes

**Vote（投票記録）:**

- id, userId, targetPokemonId, counterPokemonId, voteType

**Tag（カスタムタグ）:**

- id, name, color, createdAt, updatedAt

**PokemonCustomTag（ポケモン・タグ中間テーブル）:**

- pokemonId, tagId, createdAt
- 複合主キー: (pokemonId, tagId)

## 属性の日本語マッピング（重要）

### **ダメージクラス（damageClass）**

| 値         | 日本語 | 色       |
| ---------- | ------ | -------- |
| `physical` | 攻撃   | オレンジ |
| `special`  | 特攻   | 緑       |

### **レンジタイプ（rangeType）**

| 値       | 日本語 | 色       |
| -------- | ------ | -------- |
| `melee`  | 近接   | オレンジ |
| `ranged` | 遠隔   | 緑       |

### **バトルスタイル（battleStyle）**

| 値            | 日本語         | 色  |
| ------------- | -------------- | --- |
| `attacker`    | アタック型     | 赤  |
| `all-rounder` | バランス型     | 紫  |
| `defender`    | ディフェンス型 | 緑  |
| `speedster`   | スピード型     | 青  |
| `supporter`   | サポート型     | 黄  |

**注意**: これらの属性は基本情報であり、ダメージクラス・レンジタイプ・バトルスタイルフィルターにも使用されます。

### **カスタムタグの色（color フィールド）**

`Tag.color` には以下の値を使用可能：

- `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `gray`

## 編集時の注意点

1. **API の WHERE 条件追加時**

   - `route.ts` 内で `where` オブジェクトを動的に構築
   - `Object.keys(where).length > 0` で判定して Prisma に渡す

2. **フォーム送信時の確認**

   - `useCallback` で依存関係を明示化
   - エラー時は state をロールバック

3. **ローカル状態と サーバー状態**

   - 楽観的更新（displayUpvotes など）を活用
   - エラー時は必ず前の値に戻す

4. **ページネーション未実装**

   - 現在は全件取得パターン
   - 対策が増えたら実装検討が必要

5. **スマホファースト実装時の注意**

   - **常にモバイル視点で検討**: デスクトップ対応は後付けする
   - **レスポンシブクラス**: `md:` / `lg:` は段階的に追加
   - **ボタン/入力高さ**: モバイルで `py-2.5`、タブレット以上で `md:py-2` に統一
   - **余白**: `p-3 md:p-4` や `gap-3 md:gap-4` で一貫性を保つ
   - **画像サイズ**: `w-14 h-14 md:w-16 md:h-16` のようにモバイル優先で指定
   - **テキストサイズ**: 基本を `text-sm`、必要に応じて `md:text-base` を追加
   - **フレックス方向**: `flex-col md:flex-row` でモバイルは縦積み

## コンポーネント設計パターン

- **親コンポーネント**: データ取得・状態管理、ハンドラー定義
- **子コンポーネント**: 表示・入力、親から渡されたハンドラーを呼び出し
- Props は明示的に定義（Interface）
- コールバック関数の型チェックは確実に行う

## ポケモン詳細ページ - 情報セクション設計

### **PokemonInfo コンポーネント**

ポケモンの名前、画像、属性情報をレイアウトする親コンポーネント：

**レイアウト構成:**

```
┌──────────────────────────────────┐
│ [画像]  ポケモン名               │
│         攻撃 | 近接 | アタック型  │
│                                  │
│         カスタムタグ1            │
│         カスタムタグ2            │
│         カスタムタグ3            │
│         [さらに+N個を表示] ← 展開ボタン
└──────────────────────────────────┘
```

**機能:**

- すべてのポケモン情報をアイコンの右側に配置（スマホ/PC 両対応）
- 基本情報タグ（攻撃/特攻/近接/遠隔/バトルスタイル）は常時表示
- カスタムタグはデバイスに応じて動的に表示数変更
  - モバイル（< 768px）: 最初 2 つ表示
  - PC（>= 768px）: 最初 3 つ表示
- 余りのタグは「さらに N 個のタグを表示」で展開可能（ベストプラクティス）
- `compact={true}` プロップスで compact モード有効化

### **PokemonAttributesTags コンポーネント**

タグ表示と管理を行う子コンポーネント：

**プロップス:**

```typescript
interface PokemonAttributesTagsProps {
  damageClass: string; // 攻撃/特攻
  rangeType: string; // 近接/遠隔
  battleStyle: string; // バトルスタイル
  customTags: CustomTag[]; // ユーザー追加タグ
  slug?: string;
  onTagsUpdated?: () => void;
  showBasicTags?: boolean; // 基本タグ表示切り替え
  showCustomTags?: boolean; // カスタムタグ表示切り替え
  compact?: boolean; // コンパクトモード（3タグまで表示 + 展開ボタン）
}
```

**タグ追加フォーム（ベストプラクティス）:**

- インラインフォーム（展開/折りたたみ式）
- ラベル付きで目的を明確化
- Enter キーで送信可能
- Escape キーでキャンセル可能
- 送信ボタンは空入力時に disabled
- placeholder で入力形式をガイド
- 文字数制限（maxLength）を事前表示

**デバイスごとのタグ表示数:**

- モバイル（< 768px）: 2 つまで表示 + 展開ボタン
- PC（>= 768px）: 3 つまで表示 + 展開ボタン

## コンポーネント設計パターン

- **親コンポーネント**: データ取得・状態管理、ハンドラー定義
- **子コンポーネント**: 表示・入力、親から渡されたハンドラーを呼び出し
- Props は明示的に定義（Interface）
- コールバック関数の型チェックは確実に行う

## ポケモン詳細ページ - タブシステム設計

### **PokemonTabs コンポーネント**

3 つのタブを管理する親コンポーネント：

```typescript
interface PokemonTabsProps {
  pokemonId: number;
  slug: string;
  children: {
    counters: React.ReactNode; // Tab 0: カウンターピック
    counteredBy: React.ReactNode; // Tab 1: 有利対面（補足: このポケモンが有利に戦える相手）
    stats: React.ReactNode; // Tab 2: ステータス詳細
  };
}
```

**スタイリング特性:**

- タブボタン: アンダーライン型（border-bottom）で選択状態を表示
- アクティブタブ: `border-blue-600 text-blue-600 dark:border-blue-400`
- インアクティブ: `border-transparent text-gray-600` でサブドルされた表示
- モバイル対応: `text-xs md:text-sm` で文字サイズを調整、`flex-1` で等幅配置
- 「有利対面」タブ選択時: タブ下部に説明情報を常時表示

### **タブコンテンツ各コンポーネント**

**Tab 0: カウンターピック (PokemonPageClient)**

- CandidateCardList: このポケモンを対策するポケモン一覧（投票・編集機能付き）
- AddCounterForm: 新規対策追加フォーム
- データ取得: `/api/pokemon/[slug]/counters`

**Tab 1: 有利対面 (ReverseCounterList)**

- CandidateCardList の再利用で逆向きカウンター表示
- このポケモンが有利に戦える相手を表示
- 投票ロジック: 対象ポケモンと対策ポケモンを反転させて API 呼び出し
- データ取得: `/api/pokemon/[slug]/reverse-counters`
- 読み込み状態・エラーハンドリング実装

**Tab 2: ステータス詳細 (StatRadarChartTab)**

- StatRadarChart コンポーネント使用
- HP/攻撃/特攻/防御/特防/素速をレーダーチャートで可視化
- Lv15 の実値を使用
- データ取得: `/api/stats?slug={slug}`

## フォーム標準パターン

すべてのインラインフォーム（タグ追加、対策追加など）は以下の統一パターンを使用してください。

### **パターン概要**

**モバイル UX 最適化:**

- フォーム操作後（送信/キャンセル）に `resetViewport()` を呼び出してビューポートを完全にリセット
  - autoFocus による iOS キーボード表示時のズーム問題に対応
  - ユーザー操作後の画面サイズ（zoom level）と スクロール位置を元に戻す
- 実装内容:
  - `document.documentElement.style.zoom = "1"` でズーム倍率をリセット
  - `window.scrollTo({ top: 0, behavior: "smooth" })` でスクロール位置をリセット
  - `inputRef.current?.blur()` で入力フォーカスを外す（iOS で UI が再計算される）
  - 50ms 遅延で実行（ブラウザのレイアウト処理後）

**キーボード操作対応:**

- Enter キー: フォーム送信（`if (e.key === "Enter") handleSubmit()`)
- Escape キー: フォーム表示切り替え（`if (e.key === "Escape") handleCancel()`)

**フォーム操作フロー:**

1. 表示ボタン（`setShowForm(true)`）
2. autoFocus でフォーム要素にフォーカス
3. Enter または送信ボタンで送信 → `resetViewport()`
4. Escape またはキャンセルボタンで終了 → `resetViewport()`
5. エラー時は state をロールバック

### **実装コード例**

**PokemonAttributesTags.tsx（タグ追加フォーム）:**

```typescript
import { useState, useEffect, useRef } from "react";

export default function PokemonAttributesTags(
  {
    /* ... */
  }
) {
  const [showForm, setShowForm] = useState(false);
  const [tagName, setTagName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ビューポートをリセット（モバイルのキーボードズーム＆スクロール位置対策）
  const resetViewport = () => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        // Zoom level をリセット
        document.documentElement.style.zoom = "1";
        // スクロール位置をリセット
        window.scrollTo({ top: 0, behavior: "smooth" });
        // 入力フォーカスを外す（iOS で UI が再計算される）
        inputRef.current?.blur();
      }, 50);
      }, 50);
    }
  };

  const handleAddTag = async () => {
    if (!tagName.trim() || !slug) {
      setError("タグ名を入力してください");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/pokemon/${slug}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tagName: tagName.trim(),
          color: "gray",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "タグの追加に失敗しました");
      }

      setTagName("");
      setShowForm(false);
      resetViewport(); // ← 重要：フォーム操作後に画面をリセット
      if (onTagsUpdated) {
        onTagsUpdated();
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "エラーが発生しました";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showForm ? (
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg space-y-2">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            新しいタグを追加
          </label>
          <input
            type="text"
            placeholder="タグ名を入力... (最大20文字)"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            maxLength={20}
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isSubmitting && tagName.trim()) {
                handleAddTag();
              }
              if (e.key === "Escape") {
                setShowForm(false);
                setTagName("");
                setError(null);
                resetViewport(); // ← Escape キーでも画面をリセット
              }
            }}
            autoFocus
            className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 text-xs md:text-sm"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setShowForm(false);
                setTagName("");
                setError(null);
                resetViewport(); // ← キャンセルボタンでも画面をリセット
              }}
              disabled={isSubmitting}
              className="px-3 py-2 text-xs md:text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
            >
              キャンセル
            </button>
            <button
              onClick={handleAddTag}
              disabled={isSubmitting || !tagName.trim()}
              className="px-3 py-2 text-xs md:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 font-medium"
            >
              {isSubmitting ? "追加中..." : "追加"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1 px-3 py-2 text-xs md:text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
        >
          <Plus size={16} />
          タグを追加
        </button>
      )}
    </>
  );
}
```

**InputCandidateCard.tsx（対策追加フォーム）:**

```typescript
import { useState, useRef, useEffect } from "react";

export default function InputCandidateCard({ handleAddCounter, handleCancel }) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ビューポートをリセット（モバイルのキーボードズーム＆スクロール位置対策）
  const resetViewport = () => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        // Zoom level をリセット
        document.documentElement.style.zoom = "1";
        // スクロール位置をリセット
        window.scrollTo({ top: 0, behavior: "smooth" });
        // 入力フォーカスを外す（iOS で UI が再計算される）
        textareaRef.current?.blur();
      }, 50);
    }
  };

  const handleSubmit = () => {
    handleAddCounter();
    resetViewport(); // ← 送信時に画面をリセット
  };

  const handleCancelWithReset = () => {
    handleCancel();
    resetViewport(); // ← キャンセル時に画面をリセット
  };

  // Escape キーの全体リスナー（フォーカス喪失時対応）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCancelWithReset();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCancel]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <textarea
        ref={textareaRef}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="対策内容を入力..."
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            handleCancelWithReset();
          }
        }}
        autoFocus
        className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 text-xs md:text-sm resize-vertical min-h-24"
      />
      <div className="flex gap-2 justify-end mt-2">
        <button
          type="button"
          onClick={handleCancelWithReset}
          disabled={isSubmitting}
          className="px-3 py-2 text-xs md:text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !reason.trim()}
          className="px-3 py-2 text-xs md:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 font-medium"
        >
          {isSubmitting ? "送信中..." : "送信"}
        </button>
      </div>
    </form>
  );
}
```

### **チェックリスト（フォーム新規追加時）**

- [ ] `resetViewport()` 関数を実装
- [ ] `autoFocus` をフォーム入力要素に設定
- [ ] Enter キーハンドラーで送信実装
- [ ] Escape キーハンドラーで form 表示切り替え実装
- [ ] 送信/キャンセル時に `resetViewport()` 呼び出し
- [ ] モバイル（320px）で表示確認
- [ ] タップ領域が 44×44px 以上であることを確認

## テスト・検証のポイント

- 投票重複防止（409 エラー返却）
- 新規対策追加後の一覧更新
- フィルタリング（複数条件の AND 検索）
- reason 編集の保持確認
- ダークモード切り替え時の表示確認
- **モバイル（320px）での表示確認**: 最小幅での正常表示を確認
- **タブレット（768px）での表示確認**: ブレークポイント切り替わり時の正常表示
- **デスクトップ（1024px 以上）での表示確認**: 無制限な幅広がりがないか確認
- **タッチ操作検証**: ボタン・フォーム要素が 44×44px 以上のタップ領域を確保しているか
- **タブ切り替え検証**: 各タブのコンテンツが正常に切り替わることを確認
- **逆向きカウンター投票**: 投票方向が正しく反転されているか確認
- **レーダーチャート表示**: ステータス値が正しく表示されているか確認
- **フォーム操作後のスクロール位置**: モバイルで form 送信/キャンセル後、画面が top にスクロールされることを確認
- **Escape キー動作**: フォーム外でも Escape キーで form を非表示にできることを確認

## 今後の拡張予定（参考）

- ページネーション
- コメント機能
- ユーザープロフィール
- 管理画面
- キャッシング戦略の最適化
