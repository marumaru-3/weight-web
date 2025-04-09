@echo off
echo === ステージング用に切り替え中 ===

copy /Y .htaccess.heroku-stg .htaccess

git add .htaccess
git commit -m "chore: ステージング用の .htaccess に切り替え"
git push heroku-stg main

echo === ローカル用に戻します ===
copy /Y .htaccess.local .htaccess

echo === 完了！また開発続けてOKです ===
pause