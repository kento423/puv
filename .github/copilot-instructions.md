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

- **Tailwind CSS** を使用
- **ダークモード対応**: `dark:` プリフィックスで className 記述
- **アイコン**: lucide-react から import（ThumbsUp, ThumbsDown, SquarePen など）
- **レスポンシブ**: `md:`, `lg:` ブレークポイント活用
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

## 今後の拡張予定（参考）

- ページネーション
- コメント機能
- ユーザープロフィール
- 管理画面
- キャッシング戦略の最適化
