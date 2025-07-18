<?php

use PHPUnit\Framework\TestCase;
use function lib\validate_weight;

class ValidatorTest extends TestCase
{
  /**
   * @dataProvider okCases
   */
  public function testWeightValid(string $input): void
  {
    [$ok] = validate_weight($input);
    $this->assertTrue($ok);
  }

  /**
   * @dataProvider ngCases
   */
  public function testWeightInvalid(string $input): void
  {
    [$ok] = validate_weight($input);
    $this->assertFalse($ok);
  }

  public static function okCases(): array
  {
    return [
      ["0"],
      ["75"],
      ["75.0"],
      ["100."],
      ["999.9"],
    ];
  }

  public static function ngCases(): array
  {
    return [
      [""],
      ["-1"],
      ["1000"],
      ["10.00"],
      ["abc"],
    ];
  }
}
