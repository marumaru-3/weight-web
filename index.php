<?php

use lib\Msg;

require_once "config.php";

// library
require_once SOURCE_BASE . "libs/helper.php";
require_once SOURCE_BASE . "libs/auth.php";
require_once SOURCE_BASE . "libs/router.php";

// Models
require_once SOURCE_BASE . "models/abstract.model.php";
require_once SOURCE_BASE . "models/user.model.php";

// Message
require_once SOURCE_BASE . "libs/message.php";

// DB
require_once SOURCE_BASE . "db/datasource.php";
require_once SOURCE_BASE . "db/user.query.php";

use function lib\page_route;
use function lib\modal_route;


session_start();

try {
    $page = $_GET["page"] ?? "home";
    $method = strtolower($_SERVER["REQUEST_METHOD"]);

    // モーダル用ルーティング
    if (isset($_GET["modal"])) {
        modal_route($_GET["modal"], $method);
        exit();
    }

    // ページ用ルーティング
    page_route($page, $method);
} catch (Throwable $e) {
    die('<h1>何かがすごくおかしいようです。</h1>');
}
