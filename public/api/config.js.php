<?php

require_once __DIR__ . "/../../php/api/bootstrap.php";

$basePath = str_replace("/api/config.js.php", "", $scriptName);

header("Content-Type: application/javascript");

echo "const BASE_PATH = '" . $basePath . "/';";
$showIdModal = isset($_SESSION["show_id_modal"]) ? "true" : "false";
echo "let showIdModal = {$showIdModal};";
exit();
