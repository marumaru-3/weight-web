<?php

namespace controller\login;

function get($page)
{
    require_once SOURCE_BASE . "views/login.php";
}

function post($page)
{
    echo "post methodを受け取りました。";
}
