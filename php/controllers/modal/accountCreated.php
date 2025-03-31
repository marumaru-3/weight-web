<?php

namespace controller\accountCreated;

use model\UserModel;

function get()
{
    $user = UserModel::getSession();

    \view\modal\modal\modalContents("accountCreated", $user);
}

function post()
{
}
