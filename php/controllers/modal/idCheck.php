<?php

namespace controller\idCheck;

use lib\Auth;
use model\UserModel;
use db\UserQuery;

function get()
{
  require_once SOURCE_BASE . "views/modal/modal.php";
}

// ID確認モーダル表示用
function check()
{
  if (!Auth::isLogin()) {
    echo json_encode(["show_id_modal" => false]);
    exit();
  }
  $user = UserModel::getSession();
  if (UserQuery::shouldShowIdModal($user->id)) {
    $_SESSION["show_id_modal"] = true;
  } else {
    $_SESSION["show_id_modal"] = false;
  }
}
