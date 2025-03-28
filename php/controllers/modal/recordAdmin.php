<?php

namespace controller\recordAdmin;

use db\WeightLogQuery;
use lib\Msg;
use lib\Auth;
use model\UserModel;
use model\WeightLogModel;
use Throwable;

function get()
{
    Auth::requireLogin();

    \view\modal\modal\modalContents("recordAdmin");
}

function post()
{
    $weight_log = new WeightLogModel();
    $weight_log->id = get_param("log_id", null);
    $weight_log->weight = get_param("weight", null);
    $weight_log->memo = get_param("memo", null);

    try {
        $is_success = WeightLogQuery::update($weight_log);
    } catch (Throwable $e) {
        Msg::push(Msg::DEBUG, $e->getMessage());
        $is_success = false;
    }
}
