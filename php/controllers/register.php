<?php

namespace controller\register;

function get($page)
{
    require_once SOURCE_BASE . "views/register.php";
}

function post($page)
{
    echo "post methodを受け取りました。";
}
