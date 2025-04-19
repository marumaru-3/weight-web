@echo off
chcp 65001

echo === ステージング用に差し替えます ===

copy /Y ".htaccess.staging" "public\.htaccess"

git add public/.htaccess
git commit -m "chore: ステージング用の .htaccess に差し替え"
git push heroku-stg main

echo === ローカル用に戻します ===
copy /Y ".htaccess.public" "public\.htaccess"

echo 書き込み中...（Heroku側に.htpasswd配置）
heroku run --app weight-web-stg --command "echo 'weight-test:$apr1$wgensxtp$Z94QAvyIyP87Oj869.61i1' > public/.htpasswd"


echo === 作業完了！お疲れさまでした ===
pause