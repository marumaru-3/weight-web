<?php

namespace controller\user;

use lib\Auth;
use model\UserModel;

function get($page)
{
    Auth::requireLogin();

    $user = UserModel::getSession();

    $page_title = "ユーザー情報";
    $page_desc = "あなたの理想体重などをカスタマイズ。あなただけの体重管理スタイルに最適化して、健康習慣の継続をサポートします。";

    \view\layout\dashboard($page, $page_title, $page_desc, $user);
}
