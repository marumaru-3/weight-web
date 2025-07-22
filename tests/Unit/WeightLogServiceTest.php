<?php

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;

use db\DummyUser;
use db\DummyWeightLog;
use service\WeightLogService;

class WeightLogServiceTest extends TestCase
{
  private const TODAY = '2025-07-21';

  #[DataProvider('validCases')]
  public function testTodayStatsValid(array $weight_logs, float $expect_weight): void
  {
    $user = new DummyUser();
    $res = WeightLogService::getTodayStats($user, $weight_logs, self::TODAY);

    $this->assertSame($expect_weight, (float)$res['weight']);
    $this->assertNotNull($res['bmi']);
  }

  public static function validCases(): array
  {
    return [
      // ───────────── logs配列 ───────────────  期待値
      'single log' => [
        [new DummyWeightLog(self::TODAY, '70.0')],
        70.0
      ],
      'multiple logs same day use first' => [
        [
          new DummyWeightLog(self::TODAY, '70.0'),
          new DummyWeightLog(self::TODAY, '72.0')
        ],
        70.0
      ]
    ];
  }


  #[DataProvider('nullCases')]
  public function testTodayStatsNullReturn(array $weight_logs): void
  {
    $user = new DummyUser();
    $res = WeightLogService::getTodayStats($user, $weight_logs, self::TODAY);

    $this->assertNull($res['weight']);
    $this->assertNull($res['bmi']);
  }

  public static function nullCases(): array
  {
    return [
      'no logs' => [[]],
      'no today log' => [
        [new DummyWeightLog('2025-07-19', '69.0')]
      ]
    ];
  }
}
