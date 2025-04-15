<?php

namespace controller\user;

use lib\Auth;
use model\UserModel;
use function lib\hasUnreadNotice;

function get($page)
{
    Auth::requireLogin();

    $user = UserModel::getSession();

    $notice_unread = hasUnreadNotice($user->id);

    $page_title = "ユーザー情報";
    $page_desc = "あなたの理想体重などをカスタマイズ。あなただけの体重管理スタイルに最適化して、健康習慣の継続をサポートします。";

    \view\layout\dashboard($page, $page_title, $page_desc, $notice_unread, $user);
}
