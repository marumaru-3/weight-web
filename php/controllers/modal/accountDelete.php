<?php

namespace controller\accountDelete;

use db\UserQuery;
use lib\Msg;
use lib\Auth;
use model\UserModel;
use Throwable;

header("Content-Type: application/json");

function get()
{
    Auth::requireLogin();

    \view\modal\modal\modalContents("accountDelete");
}

function post()
{
    try {
        $user = UserModel::getSession();
        $is_success = UserQuery::accountDelete($user);
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
