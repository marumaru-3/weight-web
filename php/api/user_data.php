<?php

require_once __DIR__ . "/bootstrap.php";

$birthdate = $user->birthdate;
list($birth_year, $birth_month, $birth_day) = explode("-", $birthdate);

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
