<?php

namespace controller\recordReset;

use db\WeightLogQuery;
use lib\Msg;
use lib\Auth;
use model\UserModel;
use Throwable;

function get()
{
    header("Content-Type: text/html");

    Auth::requireLogin();

    \view\modal\modal\modalContents("recordReset");
}

function post()
{
    header("Content-Type: application/json");

    try {
        $user = UserModel::getSession();
        $is_success = WeightLogQuery::deleteAllByUserId($user->id);
    } catch (Throwable $e) {
        Msg::push(Msg::DEBUG, $e->getMessage());
        $is_success = false;
    }

    if ($is_success) {
        Msg::push(Msg::INFO, "体重記録を初期化しました。");
    } else {
        Msg::push(Msg::ERROR, "体重記録の初期化に失敗しました。");
    }

    // JSに渡す処理
    $message = "";
    if ($is_success) {
        $message = "体重記録を初期化しました。";
    } else {
        $message = "体重記録の初期化に失敗しました。";
    }
    echo json_encode([
        "success" => $is_success,
        "message" => $message,
    ]);
    exit();
}
