<?php

namespace db;

use db\DataSource;
use model\UserModel;

class UserQuery
{
    public static function fetchById($id)
    {
        $db = new DataSource();
        $sql = "select * from users where id = :id;";
        $result = $db->selectOne(
            $sql,
            [
                ":id" => $id,
            ],
            DataSource::CLS,
            UserModel::class
        );
        return $result;
    }

    public static function insert($user)
    {
        $db = new DataSource();
        $sql =
            "insert into users(id, password, username, birthdate, gender, height, ideal_weight) values (:id, :password, :username, :birthdate, :gender, :height, :ideal_weight)";

        $user->password = password_hash($user->password, PASSWORD_DEFAULT);

        return $db->execute($sql, [
            ":id" => $user->id,
            ":password" => $user->password,
            ":username" => $user->username,
            ":birthdate" => $user->birthdate,
            ":gender" => $user->gender,
            ":height" => $user->height,
            ":ideal_weight" => $user->ideal_weight,
        ]);
    }

    public static function updateAccount($user)
    {
        $db = new DataSource();
        $sql = "update users set password = :password where id = :id";

        $user->password = password_hash($user->password, PASSWORD_DEFAULT);

        return $db->execute($sql, [
            ":id" => $user->id,
            ":password" => $user->password,
        ]);
    }

    public static function updateUser($user)
    {
        $db = new DataSource();
        $sql =
            "update users set username = :username, birthdate = :birthdate, gender = :gender, height = :height, ideal_weight = :ideal_weight where id = :id";

        return $db->execute($sql, [
            ":id" => $user->id,
            ":username" => $user->username,
            ":birthdate" => $user->birthdate,
            ":gender" => $user->gender,
            ":height" => $user->height,
            ":ideal_weight" => $user->ideal_weight,
        ]);
    }

    public static function deleteUser($user)
    {
        $db = new DataSource();
        $sql = "delete from users where id = :id;";
        $result = $db->execute(
            $sql,
            [
                ":id" => $user->id,
            ]
        );
        return $result;
    }

    public static function updateIdDisplay($id)
    {
        $db = new DataSource();
        $sql = "update users set id_display = now() where id = :id";
        return $db->execute($sql, [":id" => $id]);
    }

    public static function shouldShowIdModal($id)
    {
        $user = self::fetchById($id);

        if (!$user) {
            return false;
        }

        $shouldShow = strtotime($user->id_display) <= strtotime("-3 days");

        if ($shouldShow) {
            self::updateIdDisplay($id);
        }

        return $shouldShow;
    }

    public static function updateLastLoginAt($id)
    {
        $db = new DataSource();
        $sql = "update users set last_login_at = now() where id = :id";
        return $db->execute($sql, [":id" => $id]);
    }
}
