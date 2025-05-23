<?php

namespace controller\modal\login;

use lib\Auth;

function get()
{
    header("Content-Type: text/html");

    \view\modal\modal\modalContents("login");
}

function post()
{
    header("Content-Type: application/json");

    // フォームデータを取得
    $id = get_param("user_id", "");
    $pwd = get_param("password", "");

    $result = Auth::login($id, $pwd);

    // ログイン判定
    echo json_encode([
        "success" => $result[0],
        "errorMessage" => $result[1],
    ]);
    exit();
}
