# プロジェクト コーディング規約・ナレッジ

## ロケール（言語判定）

- SSR（サーバーサイドレンダリング）時は `next/headers` の `headers()` から `accept-language` を取得し、ロケールを推定する。
  - 例:
    ```ts
    const h = await headers();
    const acceptLang = h.get("accept-language") || "ja";
    const locale = acceptLang.startsWith("en") ? "en" : "ja";
    ```
- クライアントコンポーネントでは `navigator.language` を利用してロケールを判定する。
  - 例:
    ```ts
    const locale =
      typeof window !== "undefined" && navigator.language.startsWith("en")
        ? "en"
        : "ja";
    ```
- locale は props で渡さず、各コンポーネントで上記の方法で判定する。

## サーバー/クライアント分離

- SSR で取得したデータはプリミティブ型のみクライアントコンポーネントに渡す。
- クライアントで取得するデータは useEffect ＋ fetch で取得する。
- サーバー側でしか使わないロジック・データはクライアントに渡さない。

## コンポーネント設計

- パンくずリストやポケモン情報などはサーバーコンポーネントで描画。
- カウンターリストやフォームなどインタラクションが必要な部分はクライアントコンポーネントで実装。

## その他

- 型エラーやランタイムエラーが出た場合は、next/headers や Next.js のバージョン仕様を確認し、Promise/同期の違いに注意する。
- コーディング規約・ナレッジはこの instructions.md に追記・参照すること。
