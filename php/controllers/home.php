<?php

namespace controller\home;

use lib\Msg;

function get($page)
{
    $page_title = "ホーム";
    \view\layout\dashboard($page, $page_title);
}
