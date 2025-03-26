<?php

namespace lib;

class weightDaysCalc
{
  public static function idealDefferWeight($weight, $ideal_weight)
  {
    $result = number_format($weight - $ideal_weight, 1);
    if ($result >= 0) {
      return "-{$result}";
    } else {
      $result = number_format(abs($result), 1);
      return "+{$result}";
    }
  }

  public static function dayBefore($weight, $beforeWeight)
  {
    $result = number_format($weight - $beforeWeight, 1);
    if ($result >= 0) {
      return "+{$result}";
    } else {
      return "{$result}";
    }
  }

  public static function bmi($weight, $height)
  {
    $heightMeter = $height / 100;
    $result = $weight / pow($heightMeter, 2);

    return number_format($result, 2);
  }

  public static function bfp($bmi, $gender, $age)
  {
    $bmi = floatval($bmi);

    if ($gender === 'male') {
      $result = $bmi * 1.2 + $age * 0.23 - 16.2;
    } else if ($gender === 'female') {
      $result = $bmi * 1.2 + $age * 0.23 - 5.4;
    } else {
      $result = $bmi * 1.2 + $age * 0.23 - 10.8;
    }

    return number_format($result, 2);
  }
}
