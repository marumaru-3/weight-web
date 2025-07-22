<?php

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;


class HelperTest extends TestCase
{
  #[DataProvider('ageCalcCases')]
  public function testAgeCalc(string $birthdate, int $expected): void
  {
    $this->assertSame($expected, age_calc($birthdate));
  }

  public static function ageCalcCases(): array
  {
    return [
      'birthday passed' => ['2000-07-11', 25],
      'birthday not yet' => ['2000-12-31', 24]
    ];
  }
}
