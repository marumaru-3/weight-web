<?php

namespace controller\accountDelete;

use db\WeightLogQuery;
use db\UserQuery;
use lib\Msg;
use lib\Auth;
use model\UserModel;
use Throwable;

function get()
{
    header("Content-Type: text/html");

    Auth::requireLogin();

    \view\modal\modal\modalContents("accountDelete");
}

function post()
{
    header("Content-Type: application/json");

    try {
        $user = UserModel::getSession();
        $is_success =
            WeightLogQuery::deleteAllByUserId($user->id) &&
            UserQuery::deleteUser($user->id);
    } catch (Throwable $e) {
        Msg::push(Msg::DEBUG, $e->getMessage());
        $is_success = false;
    }

    if ($is_success) {
        Msg::push(Msg::INFO, "アカウントを削除しました。");
    } else {
        Msg::push(Msg::ERROR, "アカウントの削除に失敗しました。");
    }

    // JSに渡す処理
    $message = "";
    if ($is_success) {
        Auth::logout();
        $message = "アカウントを削除しました。";
    } else {
        $message = "アカウントの削除に失敗しました。";
    }
    echo json_encode([
        "success" => $is_success,
        "message" => $message,
    ]);
    exit();
}
