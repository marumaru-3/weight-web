<?php

namespace db;

use db\DataSource;
use model\WeightLogModel;

class WeightLogQuery
{
    public static function fetchByUserId($user)
    {
        $db = new DataSource();
        $sql =
            "select * from weight_logs where user_id = :id order by recorded_at;";
        $result = $db->select(
            $sql,
            [
                ":id" => $user->id,
            ],
            DataSource::CLS,
            WeightLogModel::class
        );
        return $result;
    }

    public static function fetchByDate($user_id, $date)
    {
        $db = new DataSource();

        $sql = "select * from weight_logs w
                where user_id = :user_id
                  and recorded_at = :recorded_at";

        $result = $db->selectOne(
            $sql,
            [
                ":user_id" => $user_id,
                ":recorded_at" => $date,
            ],
            DataSource::CLS,
            WeightLogModel::class
        );

        return $result;
    }

    // public static function insert($user)
    // {
    //   $db = new DataSource();
    //   $sql = "insert into users(id, password, username, birthdate, gender, height, ideal_weight) values (:id, :password, :username, :birthdate, :gender, :height, :ideal_weight)";

    //   $user->password = password_hash($user->password, PASSWORD_DEFAULT);

    //   return $db->execute(
    //     $sql,
    //     [
    //       ":id" => $user->id,
    //       ":password" => $user->password,
    //       ":username" => $user->username,
    //       ":birthdate" => $user->birthdate,
    //       ":gender" => $user->gender,
    //       ":height" => $user->height,
    //       ":ideal_weight" => $user->ideal_weight,
    //     ]
    //   );
    // }
}
