<?php

namespace controller\accountCreated;

use model\UserModel;

function get()
{
    header("Content-Type: text/html");

    $user = UserModel::getSession();

    \view\modal\modal\modalContents("accountCreated", $user);
}

function post()
{
}
