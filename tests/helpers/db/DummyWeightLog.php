<?php

namespace db;

/** 体重ログのテスト用ダミー */
class DummyWeightLog
{
  public function __construct(
    public string $recorded_at,
    public string $weight,
    public string $memo = '',
  ) {}

  /** WeightLogModel と同じインターフェースだけ用意 */
  public function getFloat(string $val): string
  {
    return number_format($val, 1, '.', '');
  }
}
