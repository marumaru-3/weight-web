<?php

namespace lib;

class weightDaysCalc
{
  public static function dayBefore($weight, $beforeWeight)
  {
    $result = $weight - $beforeWeight;
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
