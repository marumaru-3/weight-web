<?php

require_once __DIR__ . "/bootstrap.php";

use lib\Auth;
use model\UserModel;

Auth::requireLogin(true);
$user = UserModel::getSession();

header("Content-Type: application/json");

echo json_encode($_SESSION);
exit();
