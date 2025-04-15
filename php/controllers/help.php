<?php

namespace controller\help;

use lib\Auth;
use model\UserModel;
use function lib\hasUnreadNotice;

function get($page)
{
    Auth::requireLogin();

    $user = UserModel::getSession();

    $notice_unread = hasUnreadNotice($user->id);

    $page_title = "ヘルプ";
    $page_desc = "体重の記録方法やグラフの見方、体脂肪率の計算ルールなどをわかりやすく解説。アプリの使い方がすぐにわかるサポートページ。";

    \view\layout\dashboard($page, $page_title, $page_desc, $notice_unread, $user);
}
