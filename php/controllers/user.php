<?php

namespace controller\user;

function get($page)
{
    $page_title = "ユーザー情報";
    \view\layout\dashboard($page, $page_title);
}
