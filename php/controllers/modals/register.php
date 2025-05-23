<?php

namespace controller\modal\register;

use lib\Auth;
use model\UserModel;

function get()
{
    header("Content-Type: text/html");

    \view\modal\modal\modalContents("register");
}

function post()
{
    header("Content-Type: application/json");

    $user = new UserModel();
    // フォームデータを取得
    $user->password = get_param("password", "");
    $user->username = get_param("username", "");

    $birth_year = get_param("birth-year", "");
    $birth_month = get_param("birth-month", "");
    $birth_day = get_param("birth-day", "");
    $birthdate = "{$birth_year}-{$birth_month}-{$birth_day}";
    $user->birthdate = $birthdate;

    $user->gender = get_param("gender", "");
    $user->height = get_param("height", "");
    $user->ideal_weight = get_param("ideal-weight", "");

    $result = Auth::regist($user);

    // 登録判定
    echo json_encode([
        "success" => $result[0],
        "errorMessage" => $result[1],
        // "arr" => [$pwd, $username, $birthdate, $gender, $height, $ideal_weight]
    ]);
    exit();
}
