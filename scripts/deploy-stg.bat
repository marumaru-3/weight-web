@echo off
echo === �X�e�[�W���O�p�ɐ؂�ւ��� ===

copy /Y .htaccess.heroku-stg .htaccess

git add .htaccess
git commit -m "chore: �X�e�[�W���O�p�� .htaccess �ɐ؂�ւ�"
git push heroku-stg main

echo === ���[�J���p�ɖ߂��܂� ===
copy /Y .htaccess.local .htaccess

echo === �����I�܂��J��������OK�ł� ===
pause