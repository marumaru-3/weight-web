<?php

namespace controller\modal\notifications;

use lib\Auth;
use model\UserModel;
use db\NoticeReadQuery;

function get()
{
  header("Content-Type: text/html");

  Auth::requireLogin();

  $user = UserModel::getSession();

  NoticeReadQuery::upsertLastReadAt($user->id);

  \view\modal\modal\modalContents("notifications");
}
