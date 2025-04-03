<?php

require_once __DIR__ . "/bootstrap.php";
header("Content-Type: application/javascript");

echo "const BASE_PATH = '" . BASE_CONTEXT_PATH . "';";
echo "let showIdModal = " .
    ($_SESSION["show_id_modal"] ? "true" : "false") .
    ";";
exit();
