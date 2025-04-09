## 🚀 デプロイ・開発環境 切り替え手順（Vite + Heroku 運用）

### 🔧 共通：ビルド前にやること

- 必要な `.env` ファイルがプロジェクトルートに存在していることを確認

---

### 📦 本番 or ステージングにデプロイする場合

#### 1. Vite で本番用ビルドを実行

```
npx vite build --mode heroku
```

#### 2. バッチファイルでデプロイ（どちらかを実行）

```
.\deploy-stg.bat    # ステージング環境にデプロイ
.\deploy-prod.bat   # 本番環境にデプロイ
```

- Vite で生成された `public/assets/` 以下のファイルがコミット対象になります

---

### 🛠 開発環境に戻す場合（MAMP など）

#### 1. Vite で開発ビルドを実行

```
npx vite build --mode dev
```

#### 2. `.htaccess` の切り替え

- `.htaccess.local` の内容を `.htaccess` にコピペして上書き

> ※ `.htaccess.heroku-stg` / `.htaccess.heroku-prod` なども必要に応じて切り替えてください

---

### 💡 補足メモ

- `.env.heroku` と `.env.dev` はそれぞれ `VITE_BASE_PATH` を使って `base` パスを切り替えています
- `.env.local` は使用していません（モード名と競合するため）

---
