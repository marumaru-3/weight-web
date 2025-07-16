<?php

use PHPUnit\Framework\TestCase;

use lib\WeightDaysCalc;

class WeightDaysCalcTest extends TestCase
{
  public function testIdealDefferWeight()
  {
    $this->assertSame('-0.5', WeightDaysCalc::idealDefferWeight(63.0, 62.5));
    $this->assertSame('+0.5', WeightDaysCalc::idealDefferWeight(62.0, 62.5));
    $this->assertSame('+0.0', WeightDaysCalc::idealDefferWeight(62.5, 62.5));
  }
  public function testDayBefore()
  {
    $this->assertSame('+0.5', WeightDaysCalc::dayBefore(63.0, 62.5));
    $this->assertSame('-0.5', WeightDaysCalc::dayBefore(62.0, 62.5));
    $this->assertSame('+0.0', WeightDaysCalc::dayBefore(62.5, 62.5));
  }
  public function testBmi()
  {
    $this->assertSame('22.54', WeightDaysCalc::bmi(64.0, 168.5));
    $this->assertSame('26.26', WeightDaysCalc::bmi(95.3, 190.5));
  }
  public function testBfp()
  {
    $this->assertSame('16.60', WeightDaysCalc::bfp(22.54, 'male', 25));
    $this->assertSame('27.40', WeightDaysCalc::bfp(22.54, 'female', 25));
    $this->assertSame('22.00', WeightDaysCalc::bfp(22.54, 'other', 25));
  }

  // 大きな値でのテスト
  public function testIdealDefferWeightLargeNumber()
  {
    $this->assertSame('-1500.0', WeightDaysCalc::idealDefferWeight(11500.0, 10000.0));
    $this->assertSame('+1500.0', WeightDaysCalc::idealDefferWeight(8500.0, 10000.0));
  }
  public function testDayBeforeLargeNumber()
  {
    $this->assertSame('+1500.0', WeightDaysCalc::dayBefore(11500.0, 10000.0));
    $this->assertSame('-1500.0', WeightDaysCalc::dayBefore(8500.0, 10000.0));
  }
  public function testBmiLargeNumber()
  {
    $this->assertSame('89106.71', WeightDaysCalc::bmi(90000.0, 100.5));
    $this->assertSame('2500.00', WeightDaysCalc::bmi(10000.0, 200.0));
  }
  public function testBfpLargeNumber()
  {
    $this->assertSame('11989.55', WeightDaysCalc::bfp(10000.00, 'male', 25));
    $this->assertSame('12000.35', WeightDaysCalc::bfp(10000.00, 'female', 25));
    $this->assertSame('11994.95', WeightDaysCalc::bfp(10000.00, 'other', 25));
  }
}
