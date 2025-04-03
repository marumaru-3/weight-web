<?php

namespace controller\recordAdmin;

use db\WeightLogQuery;
use lib\Msg;
use lib\Auth;
use model\WeightLogModel;
use model\UserModel;
use Throwable;

function get()
{
    header("Content-Type: text/html");

    Auth::requireLogin();

    \view\modal\modal\modalContents("recordAdmin");
}

function post()
{
    header("Content-Type: application/json");

    $weight_log = new WeightLogModel();
    $weight_log->recorded_at = get_param("recorded_at", null);
    $weight_log->weight = get_param("weight", null);
    $weight_log->memo = get_param("memo", null);

    try {
        $user = UserModel::getSession();
        $is_success = WeightLogQuery::update($user->id, $weight_log);
    } catch (Throwable $e) {
        Msg::push(Msg::DEBUG, $e->getMessage());
        $is_success = false;
    }

    if ($is_success) {
        Msg::push(Msg::INFO, "体重記録を更新しました。");
    } else {
        Msg::push(Msg::ERROR, "体重記録の更新に失敗しました。");
    }

    // JSに渡す処理
    $message = "";
    if ($is_success) {
        $message = "体重記録を更新しました。";
    } else {
        $message = "体重記録の更新に失敗しました。";
    }
    echo json_encode([
        "success" => $is_success,
        "message" => $message,
    ]);
    exit();
}
