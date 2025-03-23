<?php

namespace api\chart_data;

use lib\weightDaysCalc;

function chartData($user, $weight_logs)
{
  $height = $user->height;
  $gender = $user->gender;
  $age = age_calc($user->birthdate);

  $resultArr = [];

  foreach ($weight_logs as $weight_log) {
    $recorded_at = $weight_log->recorded_at;
    $weight =  $weight_log->weight;
    $bmi = weightDaysCalc::bmi($weight, $height);
    $bfp = weightDaysCalc::bfp($bmi, $gender, $age);

    $addArr = ["date" => $recorded_at, "weight" => $weight, "bmi" => $bmi, "bfp" => $bfp];

    array_push($resultArr, $addArr);
  }

  print_r($resultArr);
}
