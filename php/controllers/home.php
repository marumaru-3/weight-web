<?php

namespace controller\home;

function get($page)
{
    $page_title = "ホーム";
    $page_content = SOURCE_BASE . "views/home.php";
    require_once SOURCE_BASE . "views/layout.php";
}
