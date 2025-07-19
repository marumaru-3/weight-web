<?php

namespace controller\modal\register;

use lib\Auth;
use model\UserModel;
use function lib\validate_decimal;
use function lib\json_validation_error;

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

    // 身長バリデーション
    [$height_ok, $height_err] = validate_decimal($user->height);
    if (!$height_ok) {
        json_validation_error($height_err);
    }

    // 理想体重バリデーション
    [$ideal_weight_ok, $ideal_weight_err] = validate_decimal($user->ideal_weight);
    if (!$ideal_weight_ok) {
        json_validation_error($ideal_weight_err);
    }

    $result = Auth::regist($user);

    // 登録判定
    echo json_encode([
        "success" => $result[0],
        "errorMessage" => $result[1],
        // "arr" => [$pwd, $username, $birthdate, $gender, $height, $ideal_weight]
    ]);
    exit();
}
