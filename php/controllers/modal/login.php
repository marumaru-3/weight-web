<?php

namespace controller\login;

use lib\Auth;

header("Content-Type: application/json");

function post()
{
    // フォームデータを取得
    $id = get_param('user_id', '');
    $pwd = get_param('password', '');

    $result = Auth::login($id, $pwd);

    // ログイン判定
    echo json_encode([
        "success" => $result[0],
        'errorMessage' => $result[1]
    ]);
    exit();
}
