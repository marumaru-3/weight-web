<?php

namespace controller\log;

use lib\Auth;
use db\WeightLogQuery;
use model\UserModel;
use function api\chart_data\chartData;

function get($page)
{

    Auth::requireLogin();

    $user = UserModel::getSession();

    $weight_logs = WeightLogQuery::fetchByUserId($user);

    $page_title = "体重ログ";
    if (count($weight_logs) > 0) {
        chartData($user, $weight_logs);
        \view\layout\dashboard($page, $page_title, $user, $weight_logs);
    } else {
        \view\layout\dashboard($page, $page_title);
    }
}
