<?php

namespace controller\modal\recordDelete;

use db\WeightLogQuery;
use lib\Msg;
use model\UserModel;
use Throwable;

function post()
{
    header("Content-Type: application/json");
    $recorded_at = get_param("recorded_at", null);

    try {
        $user = UserModel::getSession();
        $is_success = WeightLogQuery::delete($user->id, $recorded_at);
    } catch (Throwable $e) {
        Msg::push(Msg::DEBUG, $e->getMessage());
        $is_success = false;
    }

    if ($is_success) {
        Msg::push(Msg::INFO, "体重記録を削除しました。");
    } else {
        Msg::push(Msg::ERROR, "体重記録の削除に失敗しました。");
    }

    // JSに渡す処理
    $message = "";
    if ($is_success) {
        $message = "体重記録を削除しました。";
    } else {
        $message = "体重記録の削除に失敗しました。";
    }
    echo json_encode([
        "success" => $is_success,
        "message" => $message,
    ]);
    exit();
}
