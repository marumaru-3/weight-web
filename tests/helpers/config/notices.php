<?php

namespace config;

/**
 * テスト用の notice 一覧（通知の内容一覧）を返すモック関数 
 */

require_once __DIR__ . '/TestFixtures.php';

function notices(): array
{
  return TestFixtures::$notices;
}
