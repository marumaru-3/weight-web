<?php

require_once __DIR__ . "/bootstrap.php";

use db\WeightLogQuery;
use lib\weightDaysCalc;

$weight_logs = WeightLogQuery::fetchByUserId($user);

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

echo json_encode($resultArr);
exit();
