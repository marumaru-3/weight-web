<?php

require_once "config.php";

// Models
require_once SOURCE_BASE . "models/user.model.php";

// DB
require_once SOURCE_BASE . "db/datasource.php";
require_once SOURCE_BASE . "db/user.query.php";

session_start();

$page = $_GET["page"] ?? "home";
$method = strtolower($_SERVER["REQUEST_METHOD"]);

// modal用ルーティング
if (isset($_GET["modal"])) {
    modal_route($_GET["modal"], $method);
    exit();
}

// ページ用ルーティング
page_route($page, $method);

function page_route($page, $method)
{
    $targetFile = SOURCE_BASE . "controllers/{$page}.php";

    if (!file_exists($targetFile)) {
        require_once SOURCE_BASE . "controllers/404.php";
        return;
    }

    require_once $targetFile;

    $fn = "\\controller\\{$page}\\{$method}";

    $fn($page);
}

function modal_route($modal, $method)
{
    $targetFile = SOURCE_BASE . "controllers/modal/{$modal}.php";

    if (!file_exists($targetFile)) {
        require_once SOURCE_BASE . "controllers/404.php";
        return;
    }

    require_once $targetFile;

    $fn = "\\controller\\{$modal}\\{$method}";

    $fn();
}
