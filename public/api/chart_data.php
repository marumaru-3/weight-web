<?php

require_once __DIR__ . "/../../php/api/bootstrap.php";

use lib\Auth;
use model\UserModel;
use db\WeightLogQuery;
use lib\weightDaysCalc;

Auth::requireLogin(true);
$user = UserModel::getSession();

header("Content-Type: application/json");

$weight_logs = WeightLogQuery::fetchByUserId($user->id);

$ideal_weight = $user->ideal_weight;

$resultArr = [];
foreach ($weight_logs as $log) {
    $weight = $log->weight;
    $bmi = weightDaysCalc::bmi($log->weight, $user->height);
    $bfp = weightDaysCalc::bfp($bmi, $user->gender, age_calc($user->birthdate));

    $resultArr[] = [
        "date" => $log->recorded_at,
        "weight" => $log->getFloat($weight),
        "bmi" => $bmi,
        "bfp" => $bfp,
    ];
}

echo json_encode(["chart_arr" => $resultArr, "ideal_weight" => $ideal_weight]);
exit();
