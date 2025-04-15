<?php

namespace controller\home;

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

    $page_title = "ホーム";
    $page_desc = "体重を記録するだけで、BMI・推定体脂肪率・理想体重との差がすぐにわかる体重管理アプリ。毎日の記録をグラフで見やすく可視化。シンプルで続けやすい健康習慣に。";

    if (count($weight_logs) > 0) {
        \view\layout\dashboard($page, $page_title, $page_desc, $notice_unread, $user, $weight_logs);
    } else {
        \view\layout\dashboard($page, $page_title, $page_desc, $notice_unread, $user);
    }
}
