<?php

namespace controller\modal\adminUser;

use db\UserQuery;
use lib\Msg;
use lib\Auth;
use model\UserModel;
use function lib\validate_decimal;
use function lib\json_validation_error;
use Throwable;

function get()
{
    header("Content-Type: text/html");

    Auth::requireLogin();

    \view\modal\modal\modalContents("adminUser");
}

function post()
{
    header("Content-Type: application/json");

    $user = new UserModel();

    $session_user = UserModel::getSession();
    $user->id = $session_user->id;

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

    try {
        $is_success = UserQuery::updateUser($user);
    } catch (Throwable $e) {
        Msg::push(Msg::DEBUG, $e->getMessage());
        $is_success = false;
    }

    if ($is_success) {
        $updated_user = UserQuery::fetchById($user->id);
        UserModel::setSession($updated_user);
        Msg::push(Msg::INFO, "基本情報を更新しました。");
    } else {
        Msg::push(Msg::ERROR, "基本情報の更新に失敗しました。");
    }

    // JSに渡す処理
    $message = "";
    if ($is_success) {
        $message = "基本情報を更新しました。";
    } else {
        $message = "基本情報の更新に失敗しました。";
    }
    echo json_encode([
        "success" => $is_success,
        "message" => $message,
    ]);
    exit();
}
