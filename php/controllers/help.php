<?php

namespace controller\help;

function get($page)
{
    $page_title = "ヘルプ";
    \view\layout\dashboard($page, $page_title);
}
