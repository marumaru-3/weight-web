<?php

require_once "config.php";

// Models
require_once SOURCE_BASE . "models/user.model.php";

// DB
require_once SOURCE_BASE . "db/datasource.php";
require_once SOURCE_BASE . "db/user.query.php";

$page = $_GET["page"] ?? "home";
$method = strtolower($_SERVER["REQUEST_METHOD"]);

route($page, $method);

function route($page, $method)
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
