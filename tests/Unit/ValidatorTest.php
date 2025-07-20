<?php

use PHPUnit\Framework\TestCase;
use function lib\validate_decimal;
use function lib\validate_password;

class ValidatorTest extends TestCase
{
  // ===== Password validation =====

  /**
   * @dataProvider passwordOkCases
   */
  public function testPasswordValid(string $input): void
  {
    [$ok] = validate_password($input);
    $this->assertTrue($ok);
  }

  /**
   * @dataProvider passwordNgCases
   */
  public function testPasswordInValid(string $input): void
  {
    [$ok] = validate_password($input);
    $this->assertFalse($ok);
  }

  public static function passwordOkCases(): array
  {
    return [
      ['Abc4'],
      [str_repeat('a', 30)],
      ['passWORD123#'],
    ];
  }

  public static function passwordNgCases(): array
  {
    return [
      [''],
      ['abc'],
      [str_repeat('a', 31)],
      ['あBCD'],
      ["abc\t"]
    ];
  }

  // ===== Decimal validation =====

  /**
   * @dataProvider decimalOkCases
   */
  public function testDecimalValid(string $input): void
  {
    [$ok] = validate_decimal($input);
    $this->assertTrue($ok);
  }

  /**
   * @dataProvider decimalNgCases
   */
  public function testDecimalInvalid(string $input): void
  {
    [$ok] = validate_decimal($input);
    $this->assertFalse($ok);
  }

  public static function decimalOkCases(): array
  {
    return [
      ["0"],
      ["75"],
      ["75.0"],
      ["100."],
      ["999.9"],
    ];
  }

  public static function decimalNgCases(): array
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
