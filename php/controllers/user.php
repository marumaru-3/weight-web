<?php

namespace controller\user;

use lib\Auth;
use model\UserModel;

function get($page)
{
    Auth::requireLogin();

    $user = UserModel::getSession();

    $page_title = "ユーザー情報";
    \view\layout\dashboard($page, $page_title, $user);
}
