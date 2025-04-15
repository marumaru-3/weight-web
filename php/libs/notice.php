<?php

namespace lib;

use DateTime;
use db\NoticeReadQuery;
use function config\notices;

function hasUnreadNotice($user_id)
{
  $notices = notices();
  $latestNotice = new DateTime(max(array_column($notices, 'date')));
  $noticeRead = NoticeReadQuery::fetchByUserId($user_id);
  $lastRead = $noticeRead ? new DateTime($noticeRead->last_read_at) : null;

  return is_null($lastRead) || $lastRead < $latestNotice;
}
