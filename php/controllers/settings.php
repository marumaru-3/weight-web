<?php

namespace controller\settings;

function get($page)
{
    $page_title = "設定";
    \view\layout\dashboard($page, $page_title);
}
