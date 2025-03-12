<?php

namespace controller\user;

function get($page)
{
    $page_title = "ユーザー情報";
    $page_content = SOURCE_BASE . "views/user.php";
    require_once SOURCE_BASE . "views/layout.php";
}
