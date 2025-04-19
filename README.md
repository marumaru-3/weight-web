# 体重 Web

毎日体重を記録して、理想のあなたを目指せるシンプルな体重管理 Web アプリです。
メールアドレス不要でアカウント登録ができ、グラフ・数値・目標管理まで一括で対応！

![体重Web OGP](https://www.weight-web.site/images/ogp.png)

---

## 公開 URL

https://www.weight-web.site/

---

## 使用技術

- PHP / MySQL（ページ表示・ルーティング・DB 処理）
- CSS・JavaScript / Vite（フロントビルド）
- Chart.js（グラフ描画）
- Heroku（ステージング・本番環境）
- Google Tag Manager / GA4（アクセス解析）
- Git / GitHub（バージョン管理）

---

## 主な機能

- 日々の体重記録（kg）と一言メモの記録
- 1 週間から 1 年単位までの日別グラフ表示
- BMI・推定体脂肪率・目標体重との差を自動計算
- 10 桁の ID でログイン&端末間共有可能
- お知らせ通知（モーダル&未読管理）
- OGP / SEO / 利用規約対応済み
- モバイルファーストデザイン

---

## ローカル開発セットアップ

```bash
git clone https://github.com/marumaru-3/weight-web.git
cd weight-web

# .envファイルを自分で作成し、以下のような内容を記載してください。
# APP_ENV=local
# DB_HOST=localhost
# DB_PORT=8889
# DB_NAME=weightweb
# DB_USERNAME=develop_user
# DB_PASSWORD=developKaihatsu0310

# PHPの組み込みサーバーを使う場合（`public` をルートに指定）
php -S localhost:8888 -t public
```

または

- MAMP / XAMPP などを使っている場合は、`weight-web/public` をドキュメントルートに設定し、  
  ブラウザから `http://localhost:8888` にアクセスしてください。

---

## デプロイ・開発環境 切り替え手順（Vite + Heroku 運用）

### 本番 or ステージングにデプロイする場合

#### 1. バッチファイルでデプロイ（どちらかを実行）

```
.\scripts\deploy-stg.bat     # ステージング環境にデプロイ
.\scripts\deploy-prod.bat    # 本番環境にデプロイ
```

- Vite で生成された `public/assets/` 以下のファイルがコミット対象になります

---

### 開発環境に戻す場合（MAMP など）

#### 1. `.htaccess` の切り替え

- `.htaccess.public` の内容を `.htaccess` にコピペして上書き

※ `.htaccess.heroku-stg` も必要に応じて切り替えてください

---

## Vite のビルド方法（JavaScript / CSS）

体重 Web では、Vite を使用して`main.js`と`style.css`をビルドしています。
デザイン・機能を変更した際は、以下の手順でビルドを行ってください。

```bash
npm install      #初回のみ
npx vite build    # JS/CSSをビルド（出力先：public/assets/）
```

- ビルド後、`public/assets/`フォルダに出力されたファイルが PHP から読み込まれます
- Vite の開発用サーバー（`npm run dev`）は使用していません
