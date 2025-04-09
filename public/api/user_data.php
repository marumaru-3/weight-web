<?php

require_once __DIR__ . "/../../php/api/bootstrap.php";

use lib\Auth;
use model\UserModel;

Auth::requireLogin(true);
$user = UserModel::getSession();

header("Content-Type: application/json");

$birthdate = $user->birthdate;
list($birth_year, $birth_month, $birth_day) = explode("-", $birthdate);

$birth_month = ltrim($birth_month, "0") ?: "0";
$birth_day = ltrim($birth_day, "0") ?: "0";

echo json_encode([
    "username" => $user->username,
    "birth_year" => $birth_year,
    "birth_month" => $birth_month,
    "birth_day" => $birth_day,
    "gender" => $user->gender,
    "height" => $user->height,
    "ideal_weight" => $user->ideal_weight,
]);

exit();
