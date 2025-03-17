<?php

namespace controller\logout;

use lib\Auth;
use lib\Msg;

function get()
{
  if (!Auth::logout()) {
    Msg::push(Msg::ERROR, 'ログアウトが失敗しました。');
  }

  redirect("welcome");
}
