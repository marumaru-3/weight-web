<?php

require_once __DIR__ . "/bootstrap.php";

$basePath = str_replace('/php/api/config.js.php', '', $scriptName);

header("Content-Type: application/javascript");

echo "const BASE_PATH = '" . $basePath . "/';";
echo "let showIdModal = " .
    ($_SESSION["show_id_modal"] ? "true" : "false") .
    ";";
exit();
