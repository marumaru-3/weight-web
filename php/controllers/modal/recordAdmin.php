<?php

namespace controller\recordAdmin;

use lib\Auth;
use db\WeightLogQuery;
use model\UserModel;

function get()
{
  Auth::requireLogin();

  $user = UserModel::getSession();

  $weight_logs = WeightLogQuery::fetchByUserId($user);

  \view\modal\modal\modalContents("recordAdmin", null, $weight_logs);
}

function post() {}
