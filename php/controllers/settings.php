<?php

namespace controller\settings;

use lib\Auth;
use model\UserModel;

function get($page)
{
    Auth::requireLogin();

    $user = UserModel::getSession();

    $page_title = "設定";
    $page_desc = "IDの確認、アカウント削除、体重記録の初期化など、大事な情報の管理を行える設定ページ。シンプルで分かりやすく、安全な操作が可能です。";

    \view\layout\dashboard($page, $page_title, $page_desc, $user);
}
