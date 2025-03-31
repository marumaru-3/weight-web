<?php

namespace controller\adminAccount;

use db\UserQuery;
use lib\Msg;
use lib\Auth;
use model\UserModel;
use Throwable;

header("Content-Type: application/json");

function get()
{
    Auth::requireLogin();

    \view\modal\modal\modalContents("adminAccount");
}

function post()
{
    $user = new UserModel();

    $session_user = UserModel::getSession();
    $user->id = $session_user->id;

    $user->password = get_param("password", "");

    try {
        $is_success = UserQuery::updateAccount($user);
    } catch (Throwable $e) {
        Msg::push(Msg::DEBUG, $e->getMessage());
        $is_success = false;
    }

    if ($is_success) {
        $updated_user = UserQuery::fetchById($user->id);
        UserModel::setSession($updated_user);
        Msg::push(Msg::INFO, "パスワードを更新しました。");
    } else {
        Msg::push(Msg::ERROR, "パスワードの更新に失敗しました。");
    }

    // JSに渡す処理
    $message = "";
    if ($is_success) {
        $message = "パスワードを更新しました。";
    } else {
        $message = "パスワードの更新に失敗しました。";
    }
    echo json_encode([
        "success" => $is_success,
        "message" => $message,
    ]);
    exit();
}
