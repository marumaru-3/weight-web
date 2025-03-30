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

  public static function update($user, $weight_log)
  {
    $db = new DataSource();
    $sql = "update weight_logs set weight = :weight, memo = :memo where user_id = :user_id and recorded_at = :recorded_at";

    return $db->execute(
      $sql,
      [
        ":user_id" => $user->id,
        ":weight" => $weight_log->weight,
        ":memo" => $weight_log->memo,
        ":recorded_at" => $weight_log->recorded_at,
      ]
    );
  }

  public static function insert($user, $weight_log)
  {
    $db = new DataSource();
    $sql = "insert into weight_logs(user_id, weight, memo, recorded_at) values (:user_id, :weight, :memo, :recorded_at)";

    return $db->execute(
      $sql,
      [
        ":user_id" => $user->id,
        ":weight" => $weight_log->weight,
        ":memo" => $weight_log->memo,
        ":recorded_at" => $weight_log->recorded_at,
      ]
    );
  }

  public static function delete($user, $recorded_at)
  {
    $db = new DataSource();
    $sql = 'delete from weight_logs where user_id = :user_id and recorded_at = :recorded_at';

    return $db->execute(
      $sql,
      [
        ":user_id" => $user->id,
        ":recorded_at" => $recorded_at,
      ]
    );
  }
}
