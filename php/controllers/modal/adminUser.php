<?php

namespace controller\adminUser;

use db\UserQuery;
use lib\Msg;
use lib\Auth;
use model\UserModel;
use Throwable;

header("Content-Type: application/json");

function get()
{
  Auth::requireLogin();

  \view\modal\modal\modalContents("adminUser");
}

function post()
{
  $user = new UserModel();

  $user->username = get_param('username', '');

  $birth_year = get_param('birth-year', '');
  $birth_month = get_param('birth-month', '');
  $birth_day = get_param('birth-day', '');
  $birthdate = "{$birth_year}-{$birth_month}-{$birth_day}";
  $user->birthdate = $birthdate;

  $user->gender = get_param('gender', '');
  $user->height = get_param('height', '');
  $user->ideal_weight = get_param('ideal-weight', '');

  try {
    $is_success = UserQuery::updateUser($user);
  } catch (Throwable $e) {
    Msg::push(Msg::DEBUG, $e->getMessage());
    $is_success = false;
  }

  if ($is_success) {
    Msg::push(Msg::INFO, '基本情報を更新しました。');
  } else {
    Msg::push(Msg::ERROR, '基本情報の更新に失敗しました。');
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
