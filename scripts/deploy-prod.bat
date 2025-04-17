@echo off
chcp 65001

echo === 本番環境用に差し替えます ===

copy /Y ".htaccess.public" "public\.htaccess"

git add public/.htaccess
git commit -m "chore: 本番環境用の .htaccess に差し替え"
git push heroku-prod main

echo === 作業完了！お疲れさまでした ===
pause