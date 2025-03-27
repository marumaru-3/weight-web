<?php

namespace controller\settings;

use lib\Auth;
use model\UserModel;

function get($page)
{
    Auth::requireLogin();

    $user = UserModel::getSession();

    $page_title = "設定";
    \view\layout\dashboard($page, $page_title, $user);
}
