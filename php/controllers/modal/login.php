<?php

namespace controller\login;

header("Content-Type: application/json");

use db\UserQuery;

function login($id)
{
    $is_success = false;

    $user = UserQuery::fetchById($id);

    if (!empty($user)) {
        $is_success = true;
        $_SESSION["user"] = $user;
    }

    return $is_success;
}

function post()
{
    // フォームデータを取得
    $id = $_POST["user_id"] ?? "";

    $result = login($id);

    // ログイン判定
    echo json_encode(["success" => $result]);
    exit();
}
