<?php

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;

use lib\WeightDaysCalc;

class WeightDaysCalcTest extends TestCase
{

  #[DataProvider('idealDiffCases')]
  public function testIdealDefferWeight(float $current, float $ideal, string $expected): void
  {
    $this->assertSame($expected, WeightDaysCalc::idealDefferWeight($current, $ideal));
  }

  public static function idealDiffCases(): array
  {
    return [
      'normal minus' => [63.0, 62.5, '-0.5'],
      'normal plus' => [62.0, 62.5, '+0.5'],
      'normal zero' => [62.5, 62.5, '+0.0'],
      'large minus'  => [11500.0, 10000.0, '-1500.0'],
      'large plus'   => [8500.0, 10000.0, '+1500.0'],
    ];
  }

  #[DataProvider('dayBeforeCases')]
  public function testDayBefore(float $today, float $yesterday, string $expected): void
  {
    $this->assertSame($expected, WeightDaysCalc::dayBefore($today, $yesterday));
  }

  public static function dayBeforeCases(): array
  {
    return [
      'normal plus' => [63.0, 62.5, '+0.5'],
      'normal minus' => [62.0, 62.5, '-0.5'],
      'normal zero' => [62.5, 62.5, '+0.0'],
      'large plus'  => [11500.0, 10000.0, '+1500.0'],
      'large minus'   => [8500.0, 10000.0, '-1500.0'],
    ];
  }


  #[DataProvider('bmiCases')]
  public function testBmi(float $weight, float $height, string $expected): void
  {
    $this->assertSame($expected, WeightDaysCalc::bmi($weight, $height));
  }

  public static function bmiCases(): array
  {
    return [
      'normal 1' => [64.0, 168.5, '22.54'],
      'normal 2' => [95.3, 190.5, '26.26'],
      'large 1'  => [90000.0, 100.5, '89106.71'],
      'large 2'   => [10000.0, 200.0, '2500.00'],
    ];
  }


  #[DataProvider('bfpCases')]
  public function testBfp(float $bmi, string $gender, int $age, string $expected): void
  {
    $this->assertSame($expected, WeightDaysCalc::bfp($bmi, $gender, $age));
  }

  public static function bfpCases(): array
  {
    return [
      'male normal'   => [22.54, 'male', 25, '16.60'],
      'female normal' => [22.54, 'female', 25, '27.40'],
      'other normal'  => [22.54, 'other', 25, '22.00'],
      'male large'    => [10000.00, 'male', 25, '11989.55'],
      'female large'  => [10000.00, 'female', 25, '12000.35'],
      'other large'   => [10000.00, 'other', 25, '11994.95'],
    ];
  }
}
