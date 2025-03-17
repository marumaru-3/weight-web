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
    $sql = "insert into users(id, password, username, birthdate, gender, height, ideal_weight) values (:id, :password, :username, :birthdate, :gender, :height, :ideal_weight)";

    $user->password = password_hash($user->password, PASSWORD_DEFAULT);

    return $db->execute(
      $sql,
      [
        ":id" => $user->id,
        ":password" => $user->password,
        ":username" => $user->username,
        ":birthdate" => $user->birthdate,
        ":gender" => $user->gender,
        ":height" => $user->height,
        ":ideal_weight" => $user->ideal_weight,
      ]
    );
  }
}
