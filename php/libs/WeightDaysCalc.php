<?php

namespace lib;

class WeightDaysCalc
{
  private static function toFloat($value): float
  {
    // 半角・全角カンマを取り除いてfloat化
    return floatval(str_ireplace([',', '，'], '', $value));
  }

  public static function idealDefferWeight($weight, $ideal_weight)
  {
    $weight = self::toFloat($weight);
    $ideal_weight = self::toFloat($ideal_weight);

    $result = number_format($weight - $ideal_weight, 1, '.', '');
    if ($result > 0) {
      return "-{$result}";
    } else {
      $result = number_format(abs($result), 1, '.', '');
      return "+{$result}";
    }
  }

  public static function dayBefore($weight, $beforeWeight)
  {
    $weight = self::toFloat($weight);
    $beforeWeight = self::toFloat($beforeWeight);

    $result = number_format($weight - $beforeWeight, 1, '.', '');
    if ($result >= 0) {
      return "+{$result}";
    } else {
      return "{$result}";
    }
  }

  public static function bmi($weight, $height)
  {
    $weight = self::toFloat($weight);
    $height = self::toFloat($height);

    $heightMeter = $height / 100;
    $result = $weight / pow($heightMeter, 2);

    return number_format($result, 2, '.', '');
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

    return number_format($result, 2, '.', '');
  }
}
