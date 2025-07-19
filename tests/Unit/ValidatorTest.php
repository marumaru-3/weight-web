<?php

use PHPUnit\Framework\TestCase;
use function lib\validate_decimal;

class ValidatorTest extends TestCase
{
  /**
   * @dataProvider okCases
   */
  public function testDecimalValid(string $input): void
  {
    [$ok] = validate_decimal($input);
    $this->assertTrue($ok);
  }

  /**
   * @dataProvider ngCases
   */
  public function testDecimalInvalid(string $input): void
  {
    [$ok] = validate_decimal($input);
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
