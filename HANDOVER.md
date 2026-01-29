# 引き継ぎ資料: 出雲子育てポータルサイト

## プロジェクト概要

島根県出雲市の子育て家庭向け地域ポータルサイト「いずも子育てナビ」をAstro + Content Collectionsで実装済み。
Claude Codeでの一括編集に最適化されたコンテンツ管理（Markdown + frontmatter）を最優先に設計。

## 進捗状況 - MVP完了

以下の項目はすべて完了し、動作確認済みです。

| 項目 | 状態 | 補足 |
|------|------|------|
| Astroプロジェクト初期化 | ✅ 完了 | |
| Tailwind CSS統合 | ✅ 完了 | |
| Sitemap統合 | ✅ 完了 | |
| ディレクトリ構成 | ✅ 完了 | |
| Content Collectionsスキーマ | ✅ 完了 | |
| メタデータ辞書（area/category/tag/targetAge） | ✅ 完了 | |
| 共通コンポーネント（Header/Footer/Breadcrumb/Tag/Button） | ✅ 完了 | |
| カードコンポーネント（Service/Event/Category/Area） | ✅ 完了 | |
| 検索コンポーネント（SearchBox/SearchFilters/SortSelect） | ✅ 完了 | |
| レイアウト（BaseLayout） | ✅ 完了 | |
| トップページ | ✅ 完了 | |
| サービス一覧・詳細ページ | ✅ 完了 | |
| イベント一覧・詳細ページ | ✅ 完了 | |
| エリア一覧・詳細ページ | ✅ 完了 | |
| カテゴリ一覧・詳細ページ | ✅ 完了 | |
| 静的ページ（about/contact/media/privacy/terms/site-map） | ✅ 完了 | |
| ダミーデータ生成スクリプト | ✅ 完了 | `npm run generate:dummy`で再生成可能 |
| サービス30件 + イベント10件のダミーデータ | ✅ 生成済み | |
| `public/robots.txt` | ✅ 完了 | |
| `public/favicon.svg` | ✅ 完了 | 現在はプレースホルダー |
| `public/images/og-default.png` | ✅ 完了 | 現在はプレースホルダー |
| `npm install` | ✅ 完了 | 依存関係インストール済み |
| `npm run dev` | ✅ 完了 | 開発サーバー起動確認済み |
| `npm run build` | ✅ 完了 | ビルド成功確認済み |
| `npm run preview` | ✅ 完了 | ビルド済みサイトプレビュー確認済み |

## ディレクトリ構成

```
izumo-kosodate-portal/
├── astro.config.mjs          # Astro設定
├── package.json              # 依存関係
├── .env                      # 環境変数（フォームURL等）
├── .env.example              # 環境変数サンプル
├── scripts/
│   └── generate-dummy-data.mjs  # ダミーデータ生成
├── public/
│   ├── favicon.svg           # サイトアイコン (現在プレースホルダー)
│   ├── robots.txt            # 検索エンジン用設定
│   └── images/
│       └── og-default.png    # OGP画像 (現在プレースホルダー)
└── src/
    ├── content.config.ts     # Content Collectionsスキーマ
    ├── styles/
    │   └── global.css        # Tailwind + カスタムテーマ
    ├── content/
    │   ├── _meta/            # メタデータ辞書
    │   │   ├── areas.ts
    │   │   ├── categories.ts
    │   │   ├── tags.ts
    │   │   ├── target-ages.ts
    │   │   └── index.ts
    │   ├── services/         # サービスMarkdown（30件のダミーデータ）
    │   │   └── ...
    │   └── events/           # イベントMarkdown（10件のダミーデータ）
    │       └── ...
    ├── components/
    │   ├── common/           # 共通コンポーネント
    │   │   ├── Header.astro
    │   │   ├── Footer.astro
    │   │   ├── Breadcrumb.astro
    │   │   ├── Tag.astro
    │   │   └── Button.astro
    │   ├── cards/            # カードコンポーネント
    │   │   ├── ServiceCard.astro
    │   │   ├── EventCard.astro
    │   │   ├── CategoryCard.astro
    │   │   └── AreaCard.astro
    │   └── search/           # 検索コンポーネント
    │       ├── SearchBox.astro
    │       ├── SearchFilters.astro
    │       └── SortSelect.astro
    ├── layouts/
    │   └── BaseLayout.astro  # 基本レイアウト
    ├── lib/
    │   ├── constants.ts      # 定数（サイト名、URL等）
    │   └── utils.ts          # ユーティリティ関数
    ├── types/
    │   └── index.ts          # 型定義
    └── pages/
        ├── index.astro       # トップ
        ├── about.astro       # このサイトについて
        ├── contact.astro     # お問い合わせ
        ├── media.astro       # 掲載希望
        ├── privacy.astro     # プライバシーポリシー
        ├── terms.astro       # 利用規約
        ├── site-map.astro    # サイトマップ
        ├── services/
        │   ├── index.astro   # サービス一覧
        │   └── [slug].astro  # サービス詳細
        ├── events/
        │   ├── index.astro   # イベント一覧
        │   └── [slug].astro  # イベント詳細
        ├── areas/
        │   ├── index.astro   # エリア一覧
        │   └── [area].astro  # エリア別一覧
        └── categories/
            ├── index.astro   # カテゴリ一覧
            └── [cat].astro   # カテゴリ別一覧
```

## サイトの起動とビルド方法

プロジェクトルートディレクトリ `izumo-kosodate-portal` で以下のコマンドを実行します。

```bash
# 1. 依存関係のインストール（初回または package.json 変更時）
npm install

# 2. 開発サーバーの起動 (http://localhost:4321 で確認可能)
npm run dev

# 3. 本番用ビルドの生成
npm run build

# 4. ビルド済みサイトのプレビュー
npm run preview
```

## コンテンツの管理と編集

-   **コンテンツファイル**: `/src/content/services/` および `/src/content/events/` 以下のMarkdownファイルを直接編集してください。1件につき1ファイルで管理されています。
-   **frontmatter**: 各Markdownファイルの先頭にあるYAML形式のfrontmatterを編集することで、タイトル、カテゴリ、タグなどのメタデータを更新できます。フィールドのキー順は統一されています。
-   **メタデータ辞書**: エリア、カテゴリ、タグ、対象年齢などの選択肢は `/src/content/_meta/` 以下のTypeScriptファイルで定義されています。表記ゆれを防ぐため、新規追加時以外はこれらのファイルを直接編集せず、既存のIDを使用してください。
-   **ダミーデータの再生成**: `npm run generate:dummy` コマンドで、定義済みのテンプレートに基づいたダミーサービス30件とイベント10件を再生成できます。既存のMarkdownファイルは上書きされるため、**注意して使用してください。**

## 重要な設定ファイル

| ファイル | 用途 |
|----------|------|
| `astro.config.mjs` | Astroの主要設定。`site`プロパティは本番デプロイ時に正しいサイトURL (`https://izumo-kosodate.example.com` をご自身のドメインに) に設定してください。 |
| `src/lib/constants.ts` | サイト名、サイトURL、外部リンク（お問い合わせフォームなど）の定数を定義。`.env`の値を優先して読み込みます。 |
| `.env` / `.env.example` | 環境変数定義ファイル。お問い合わせフォームURLやLINE公式アカウントURLなど、環境によって差し替える情報をここに記述します。`PUBLIC_SITE_URL`もこちらで上書き可能です。 |

## 次に実施すること（引き継ぎ者様へ）

1.  `public/favicon.svg` と `public/images/og-default.png` を、プロジェクトのロゴやOGPに適した実際の画像に差し替えてください。
2.  `astro.config.mjs` の `site` プロパティおよび `.env` ファイル内の `PUBLIC_SITE_URL` を、本番デプロイ予定の実際のドメインに設定してください。
3.  `.env` ファイル内の `PUBLIC_CONTACT_FORM_URL`, `PUBLIC_LINE_URL`, `PUBLIC_BUSINESS_FORM_URL` を、実際のURLに設定してください。
4.  `/src/content/services/` および `/src/content/events/` 以下のダミーMarkdownファイルを、実際のコンテンツに置き換えてください。
5.  必要に応じて `/src/content/_meta/` の辞書ファイルに、新しいエリア、カテゴリ、タグなどを追加してください。
6.  見た目やレイアウトを調整する際は、Tailwind CSSのクラスを編集するか、`src/styles/global.css` を調整してください。

## 次の拡張案

-   Algolia / Meilisearch / サーバー検索による全文検索機能の強化
-   Google Maps連携によるサービス・イベントの地図表示
-   人気順ソートの実装（アクセス解析ツールとの連携など）
-   口コミ・レビュー機能
-   Notion / Google Sheets連携など、より高度なCMSとの連携
-   PWA（プログレッシブウェブアプリ）対応

これでMVPの実装は完了です。ご不明な点があれば、お気軽にお尋ねください。