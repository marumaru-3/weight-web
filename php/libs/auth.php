<?php

namespace lib;

use db\UserQuery;
use model\UserModel;
use Throwable;

class Auth
{
  public static function login($id, $pwd)
  {
    try {
      $is_success = false;
      $errorMessage = "";

      $user = UserQuery::fetchById($id);

      if (!empty($user)) {
        if (password_verify($pwd, $user->password)) {
          $is_success = true;
          UserModel::setSession($user);
        } else {
          $errorMessage = "パスワードが間違っています。";
        }
      } else {
        $errorMessage = "IDのユーザーが見つかりません。";
      }
    } catch (Throwable $e) {
      $is_success = false;
      $errorMessage = "ログイン処理でエラーが発生しました。少し時間をおいてから再度お試しください。";
      Msg::push(Msg::DEBUG, $e->getMessage());
    }

    return [$is_success, $errorMessage];
  }

  public static function regist($user)
  {
    try {
      $is_success = false;
      $errorMessage = "";

      // 既存のIDと被らない10桁のランダムな数字IDを生成
      do {
        $id = mt_rand(1000000000, 9999999999);
        $exist_user = UserQuery::fetchById($id);
      } while (!empty($exist_user));

      $user->id = $id;

      $is_success = UserQuery::insert($user);

      if ($is_success) {
        UserModel::setSession($user);
      }
    } catch (Throwable $e) {
      $is_success = false;
      $errorMessage = "新規登録でエラーが発生しました。少し時間をおいてから再度お試しください。";
      Msg::push(Msg::DEBUG, $e->getMessage());
    }

    return [$is_success, $errorMessage];
  }

  public static function isLogin()
  {
    try {
      $user = UserModel::getSession();
    } catch (Throwable $e) {
      UserModel::clearSession();
      Msg::push(Msg::DEBUG, $e->getMessage());
      Msg::push(Msg::ERROR, 'エラーが発生しました。再度ログインを行ってください。');
      return false;
    }

    if (isset($user)) {
      return true;
    } else {
      return false;
    }
  }

  public static function logout()
  {
    try {
      UserModel::clearSession();
    } catch (Throwable $e) {
      Msg::push(Msg::DEBUG, $e->getMessage());
      return false;
    }

    return true;
  }
}
