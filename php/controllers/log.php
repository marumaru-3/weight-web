<?php

namespace controller\log;

function get($page)
{
    $page_title = "体重ログ";
    $page_content = SOURCE_BASE . "views/log.php";
    require_once SOURCE_BASE . "views/layout.php";
}
