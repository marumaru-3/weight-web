<?php

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;

use function lib\validate_decimal;
use function lib\validate_password;

class ValidatorTest extends TestCase
{
  // ===== Password validation =====

  #[DataProvider('passwordOkCases')]
  public function testPasswordValid(string $input): void
  {
    [$ok] = validate_password($input);
    $this->assertTrue($ok);
  }

  public static function passwordOkCases(): array
  {
    return [
      'min length' => ['Abc4'],
      'max length' => [str_repeat('a', 30)],
      'mixed pattern' => ['passWORD123#'],
    ];
  }


  #[DataProvider('passwordNgCases')]
  public function testPasswordInvalid(string $input): void
  {
    [$ok] = validate_password($input);
    $this->assertFalse($ok);
  }

  public static function passwordNgCases(): array
  {
    return [
      'empty' => [''],
      'too short' => ['abc'],
      'too long' => [str_repeat('a', 31)],
      'zenkaku char' => ['あBCD'],
      'control char tab' => ["abc\t"]
    ];
  }

  // ===== Decimal validation =====

  #[DataProvider('decimalOkCases')]
  public function testDecimalValid(string $input): void
  {
    [$ok] = validate_decimal($input);
    $this->assertTrue($ok);
  }

  public static function decimalOkCases(): array
  {
    return [
      'zero' => ["0"],
      'integer' => ["75"],
      'one decimal' => ["75.0"],
      'trailing dot' => ["100."],
      'max value' => ["999.9"],
    ];
  }


  #[DataProvider('decimalNgCases')]
  public function testDecimalInvalid(string $input): void
  {
    [$ok] = validate_decimal($input);
    $this->assertFalse($ok);
  }

  public static function decimalNgCases(): array
  {
    return [
      'empty' => [""],
      'negative' => ["-1"],
      'over max' => ["1000"],
      'two decimals' => ["10.00"],
      'not a number' => ["abc"],
    ];
  }
}
