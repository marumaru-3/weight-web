## 🚀 デプロイ・開発環境 切り替え手順（Vite + Heroku 運用）

### 📦 本番 or ステージングにデプロイする場合

#### 1. バッチファイルでデプロイ（どちらかを実行）

```
.\scripts\deploy-stg.bat     # ステージング環境にデプロイ
.\scripts\deploy-prod.bat    # 本番環境にデプロイ
```

- Vite で生成された `public/assets/` 以下のファイルがコミット対象になります

---

### 🛠 開発環境に戻す場合（MAMP など）

#### 1. `.htaccess` の切り替え

- `.htaccess.local` の内容を `.htaccess` にコピペして上書き

※ `.htaccess.heroku-stg` / `.htaccess.heroku-prod` なども必要に応じて切り替えてください
