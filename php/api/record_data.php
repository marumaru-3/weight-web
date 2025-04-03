<?php

require_once __DIR__ . "/bootstrap.php";

use lib\Auth;
use model\UserModel;
use db\WeightLogQuery;

Auth::requireLogin(true);
$user = UserModel::getSession();

header("Content-Type: application/json");

$date = get_param("date", null, false);

$log = WeightLogQuery::fetchByDate($user->id, $date);

echo json_encode([
    "date" => $date,
    "weight" => $log->getFloat($log->weight),
    "memo" => $log->memo,
]);
exit();
