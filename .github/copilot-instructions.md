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
│   │       └── PokemonPageClient.tsx
│   └── api/
│       └── pokemon/
│           ├── route.ts      # ポケモン一覧API
│           ├── counter/      # 対策情報CRUD
│           ├── [slug]/
│           │   └── counters  # 特定ポケモンの対策一覧
│           └── vote          # 投票機能
├── components/
│   ├── CandidateCard.tsx          # 単一対策カード（投票・編集機能付き）
│   ├── CandidateCardList.tsx      # 対策一覧
│   ├── AddCounterForm.tsx         # 対策追加フォーム
│   ├── InputCandidateCard.tsx     # 対策入力フォーム
│   └── ui/                        # shadcn/ui コンポーネント
└── lib/
    └── userId.ts             # ローカルストレージのユーザーID管理
```

## 開発時の重要なパターンと規則

### 1. **API エンドポイント設計**

- GET `/api/pokemon` - フィルタリング機能付きポケモン一覧
  - クエリパラメータ: `search`, `damageClass`, `rangeType`, `battleStyle`, `excludeSlug`
  - WHERE 条件を動的に構築
- GET/POST `/api/pokemon/[slug]/counters` - 特定ポケモンの対策情報
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

## 今後の拡張予定（参考）

- ページネーション
- コメント機能
- ユーザープロフィール
- 管理画面
- キャッシング戦略の最適化
