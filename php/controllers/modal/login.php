<?php

namespace controller\login;

use lib\Auth;
use lib\Msg;

header("Content-Type: application/json");

function get()
{
    \view\modal\modal\modalContents("login");
}

function post()
{
    // フォームデータを取得
    $id = get_param("user_id", "");
    $pwd = get_param("password", "");

    $result = Auth::login($id, $pwd);

    // Msg::push(Msg::DEBUG, "これはデバッグメッセージです。");
    // Msg::push(Msg::DEBUG, $result[1]);

    // ログイン判定
    echo json_encode([
        "success" => $result[0],
        "errorMessage" => $result[1],
    ]);
    exit();
}
