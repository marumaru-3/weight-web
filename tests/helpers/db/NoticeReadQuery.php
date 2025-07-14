<?php

namespace db;

/** DBを叩かず既読レコードを返すダミークラス */
class NoticeReadQuery
{
  public static ?object $row = null;

  public static function fetchByUserId(int $uid): ?object
  {
    return self::$row;
  }
}
