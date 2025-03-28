<?php

require_once __DIR__ . "/bootstrap.php";

use db\WeightLogQuery;

$date = get_param("date", null, false);

$log = WeightLogQuery::fetchByDate($user->id, $date);

echo json_encode([
    "date" => $date,
    "weight" => $log->getFloat($log->weight),
    "memo" => $log->memo,
]);
exit();
