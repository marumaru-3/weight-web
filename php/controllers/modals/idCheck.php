<?php

namespace controller\modal\idCheck;

use lib\Auth;
use model\UserModel;
use db\UserQuery;

function get()
{
    header("Content-Type: text/html");

    $user = UserModel::getSession();

    \view\modal\modal\modalContents("idCheck", $user);
}

// ID確認モーダル表示用
function check()
{
    if (!Auth::isLogin()) {
        $_SESSION["show_id_modal"] = false;
        return;
    }
    $user = UserModel::getSession();
    if (UserQuery::shouldShowIdModal($user->id)) {
        $_SESSION["show_id_modal"] = true;
    } else {
        $_SESSION["show_id_modal"] = false;
    }
}
