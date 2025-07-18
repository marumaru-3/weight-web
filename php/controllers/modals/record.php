<?php

namespace controller\modal\record;

use db\WeightLogQuery;
use lib\Msg;
use lib\Auth;
use model\WeightLogModel;
use model\UserModel;
use function lib\validate_weight;
use Throwable;

function get()
{
    header("Content-Type: text/html");

    Auth::requireLogin();

    \view\modal\modal\modalContents("record");
}

function post()
{
    header("Content-Type: application/json");

    $weight_log = new WeightLogModel();
    $weight_log->recorded_at = get_param("recorded_at", null);
    $weight_log->weight = get_param("weight", null);
    $weight_log->memo = get_param("memo", null);

    // 体重バリデーション
    [$ok, $err] = validate_weight($weight_log->weight);

    if (!$ok) {
        Msg::push(Msg::ERROR, $err);
        echo json_encode([
            'success' => false,
            'message' => $err
        ]);
        exit();
    }

    try {
        $user = UserModel::getSession();

        // すでに記録があるか確認
        $existing_log = WeightLogQuery::fetchByDate(
            $user->id,
            $weight_log->recorded_at
        );

        if ($existing_log) {
            $is_success = WeightLogQuery::update($user->id, $weight_log);
        } else {
            $is_success = WeightLogQuery::insert($user->id, $weight_log);
        }
    } catch (Throwable $e) {
        Msg::push(Msg::DEBUG, $e->getMessage());
        $is_success = false;
    }

    if ($is_success) {
        Msg::push(Msg::INFO, "体重記録を追加しました。");
    } else {
        Msg::push(Msg::ERROR, "体重記録の追加に失敗しました。");
    }

    // JSに渡す処理
    $message = "";
    if ($is_success) {
        $message = "体重記録を追加しました。";
    } else {
        $message = "体重記録の追加に失敗しました。";
    }
    echo json_encode([
        "success" => $is_success,
        "message" => $message,
        "debug" => $user,
    ]);
    exit();
}
