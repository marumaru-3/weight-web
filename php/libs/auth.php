<?php

namespace lib;

use db\UserQuery;
use model\UserModel;

class Auth
{
    public static function login($id, $pwd)
    {
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

        return [$is_success, $errorMessage];
    }

    public static function regist($user)
    {
        $is_success = false;

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

        return $is_success;
    }

    public static function isLogin()
    {
        $user = UserModel::getSession();

        if (isset($user)) {
            return true;
        } else {
            return false;
        }
    }
}
