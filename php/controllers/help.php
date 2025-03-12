<?php

namespace controller\help;

function get($page)
{
    $page_title = "ヘルプ";
    $page_content = SOURCE_BASE . "views/help.php";
    require_once SOURCE_BASE . "views/layout.php";
}
