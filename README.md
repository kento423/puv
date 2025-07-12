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

## memo

```
- [ ] ポケモン一覧から除外するポケモンはターゲットポケモンとすでにレコード登録済みのカウンターポケモンとしたい（他ユーザーが投稿した理由が微妙で対抗馬を出したいユースケースもありそうなため一旦保留）
- [ ] 三すくみを表現したい
- [ ]reason編集機能
- [ ]候補アイコンからそのポケモンのページにジャンプできる機能
```
