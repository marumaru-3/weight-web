<?php

use PHPUnit\Framework\TestCase;

class HelperTest extends TestCase
{
  public function testAgeCalc()
  {
    $this->assertEquals(25, age_calc("2000-07-11"));
    $this->assertEquals(24, age_calc("2000-12-31"));
  }
}
