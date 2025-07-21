<?php

namespace db;

/** ユーザーモデルのテスト用ダミー */
class DummyUser
{
  public function __construct(
    public string $height = '170',
    public string $gender = 'male',
    public string $birthdate = '2000-01-01',
    public string $ideal_weight = '65',
  ) {}
}
