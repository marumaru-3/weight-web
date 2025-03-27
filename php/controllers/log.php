<?php

namespace controller\log;

use lib\Auth;
use db\WeightLogQuery;
use model\UserModel;

function get($page)
{

    Auth::requireLogin();

    $user = UserModel::getSession();

    $weight_logs = WeightLogQuery::fetchByUserId($user);

    $page_title = "体重ログ";
    if (count($weight_logs) > 0) {
        \view\layout\dashboard($page, $page_title, $user, $weight_logs);
    } else {
        \view\layout\dashboard($page, $page_title, $user);
    }
}
