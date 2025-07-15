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
}
