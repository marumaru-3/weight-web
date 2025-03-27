<?php

namespace controller\help;

use lib\Auth;
use model\UserModel;

function get($page)
{
    Auth::requireLogin();

    $user = UserModel::getSession();

    $page_title = "ヘルプ";
    \view\layout\dashboard($page, $page_title, $user);
}
