This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 📱 スマホからローカル環境へアクセスする方法

同じWi-Fiに接続したスマートフォンから、開発中のアプリへアクセスできます。

### 1. 開発サーバーを外部公開で起動

package.json の dev スクリプトを次のように設定します。

```bash
next dev --turbopack -H 0.0.0.0
```

その後、通常通り

```bash
npm run dev
```

で起動します。

### 2. PC のローカルIPアドレスを確認（Mac）

```bash
ipconfig getifaddr en0
```

例：

```
192.168.1.12
```

### 3. スマホのブラウザでアクセス

```
http://192.168.1.12:3000
```

※ PC とスマホが同じネットワークに接続されている必要があります。

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📦 Prisma マイグレーション関連コマンド集

🎯 初期セットアップ

### Prisma 初期化（schema.prisma と .env を生成）

```
npx prisma init
```

⸻

🛠 モデル定義後のマイグレーション（開発環境用）

### schema.prisma にモデルを追加・変更後、マイグレーション実行

```
npx prisma migrate dev --name <migration-name>
```

例：

npx prisma migrate dev --name add-user-model

💡 マイグレーション実行時に自動で Prisma Client が再生成されます。

⸻

🧪 Prisma Client の手動再生成（必要な場合）
schema を変更したとき

```
npx prisma generate
```

⸻

🔍 Prisma Studio（DB 確認・編集 GUI）

```
npx prisma studio
```

⸻

🚀 本番環境へのマイグレーション適用

### すでに生成済みのマイグレーションを本番 DB に反映

```
npx prisma migrate deploy
```

⚠️ migrate deploy は本番環境で使用します。開発中は migrate dev を使用してください。

⸻

⚡ スキーマを履歴なしで即時反映（開発中限定）

```
npx prisma db push
```

🛑 注意：db push はマイグレーション履歴を残さず強制的に DB を変更するため、本番環境では使用しないでください。

⸻

📁 Prisma 関連ディレクトリ構成例

```
my-app/
├── prisma/
│   ├── schema.prisma      # Prismaモデル定義
│   └── migrations/        # マイグレーション履歴
├── src/
│   └── lib/
│       └── prisma.ts      # Prisma Client 初期化ファイル
└── .env                   # DATABASE_URLなど
```

⸻

## 🔐 本番 / CI における Prisma & Supabase 運用方針（確定版）

このプロジェクトでは **マイグレーションの責務を Vercel に寄せる** 形で安定運用しています。  
GitHub Actions は将来的に **他環境へ手動適用するための仕組み** として利用予定です（現在は本番には使いません）。

---

### 🎯 Production（本番環境）

デプロイのトリガーは `git push`。  
実行される処理は `vercel.json` に定義されています。

```
prisma generate
→ prisma migrate deploy
→ next build
```

これにより：

- アプリ起動前に必ず DB が最新化される
- migrate と build の順序が保証される
- GitHub Actions の完了を待つ必要がない

という安全な状態になります。

---

### 🧪 GitHub Actions の位置づけ

現状、本番の migrate には使用していません。

将来的には：

- staging
- 検証用DB
- 共有開発DB

などへ **workflow_dispatch（手動実行）** で流す用途を想定しています。

---

### 🔌 環境変数の役割

Prisma では接続を自動で使い分けます。

- `DATABASE_URL` → 通常のアプリ接続（pooler / pgbouncer）
- `DIRECT_URL` → migrate 実行時の direct 接続

---

### Supabase から取得する値

Prisma 用の接続文字列をそのまま利用します。

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"
```

---

### prisma/schema.prisma

```
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

---

### 🧠 generate が毎回必要な理由

Prisma Client は `node_modules` に生成されます。  
Vercel では build ごとに install が走るため、

```
prisma generate
```

は **毎回必要** です。

---

### 🛠 依存関係で壊れたときの最終手段

CI や Vercel で install 周りが怪しくなったらまずこれ。

```
rm -rf node_modules package-lock.json
npm install
```

その後 lock ファイルをコミットして再デプロイします。

## 📝 ポケモンマスターデータの最新化手順

ポケモンユナイトに新キャラクターが追加された場合、以下の手順でデータベースと画像を最新化します。

### 1. データの自動取得・更新

以下の同期スクリプトを実行すると、海外データベース（Unite-DB）および日本のポケモンユナイト公式サイトから最新のポケモン情報と高画質画像を一括で取得し、マスターデータ（`prisma/pokemonMasterData.json`）への追記と `public/pokemon/` への画像保存を自動化します。

```bash
npm run sync-pokemon
```

※メガシンカなど一部の特殊ポケモンや、公式サイト側で画像URLが変則的なものは自動取得がスキップされる場合があります。その場合は手動で JSONの追記 と 画像保存（`/public/pokemon/[slug].png`）を行ってください。

### 2. データベースへの反映

取得した新しいポケモンデータを、PrismaのSeed機能を使ってデータベースに挿入します。

```bash
npm run seed
```

これで新しいポケモンがアプリ上で利用可能になります！

⸻

## memo

```
- [ ] ポケモン一覧から除外するポケモンはターゲットポケモンとすでにレコード登録済みのカウンターポケモンとしたい（他ユーザーが投稿した理由が微妙で対抗馬を出したいユースケースもありそうなため一旦保留）
- [ ] 三すくみを表現したい
- [ ]reason編集機能
- [ ]セキュリティ対応
```
