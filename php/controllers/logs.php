<?php

namespace controller\logs;

use lib\Auth;
use db\WeightLogQuery;
use model\UserModel;
use function lib\hasUnreadNotice;

function get($page)
{
    Auth::requireLogin();

    $user = UserModel::getSession();

    $notice_unread = hasUnreadNotice($user->id);

    $weight_logs = WeightLogQuery::fetchByUserId($user->id);

    $page_title = "体重ログ";
    $page_desc = "毎日の体重記録を一覧で確認。グラフと一緒に、簡単なメモも記録できるから、体調や食事の振り返りにも便利。視覚的でわかりやすいデザイン。";

    if (count($weight_logs) > 0) {
        \view\layout\dashboard($page, $page_title, $page_desc, $notice_unread, $user, $weight_logs);
    } else {
        \view\layout\dashboard($page, $page_title, $page_desc, $notice_unread, $user);
    }
}
