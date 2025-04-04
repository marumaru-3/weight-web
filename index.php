<?php
require_once "config.php";

// library
require_once SOURCE_BASE . "libs/weight-days_calc.php";
require_once SOURCE_BASE . "libs/helper.php";
require_once SOURCE_BASE . "libs/auth.php";
require_once SOURCE_BASE . "libs/router.php";

// Models
require_once SOURCE_BASE . "models/abstract.model.php";
require_once SOURCE_BASE . "models/user.model.php";
require_once SOURCE_BASE . "models/weight_log.model.php";

// Service
require_once SOURCE_BASE . "service/weight_log.service.php";

// Message
require_once SOURCE_BASE . "libs/message.php";

// DB
require_once SOURCE_BASE . "db/datasource.php";
require_once SOURCE_BASE . "db/user.query.php";
require_once SOURCE_BASE . "db/weight_log.query.php";

// Partials
require_once SOURCE_BASE . "partials/weight-days-block.php";
require_once SOURCE_BASE . "partials/head.php";
require_once SOURCE_BASE . "partials/header.php";
require_once SOURCE_BASE . "partials/sidebar.php";
require_once SOURCE_BASE . "partials/footer.php";

// View
require_once SOURCE_BASE . "views/layout.php";
require_once SOURCE_BASE . "views/home.php";
require_once SOURCE_BASE . "views/log.php";
require_once SOURCE_BASE . "views/user.php";
require_once SOURCE_BASE . "views/help.php";
require_once SOURCE_BASE . "views/settings.php";
require_once SOURCE_BASE . "views/welcome.php";

// View modal
require_once SOURCE_BASE . "views/modals/modal.php";
require_once SOURCE_BASE . "views/modals/content/accountCreated.php";
require_once SOURCE_BASE . "views/modals/content/accountDelete.php";
require_once SOURCE_BASE . "views/modals/content/adminAccount.php";
require_once SOURCE_BASE . "views/modals/content/adminUser.php";
require_once SOURCE_BASE . "views/modals/content/idCheck.php";
require_once SOURCE_BASE . "views/modals/content/login.php";
require_once SOURCE_BASE . "views/modals/content/record.php";
require_once SOURCE_BASE . "views/modals/content/recordAdmin.php";
require_once SOURCE_BASE . "views/modals/content/recordReset.php";
require_once SOURCE_BASE . "views/modals/content/register.php";

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
    modal_route("idCheck", "check");

    // ページ用ルーティング
    page_route($page, $method);

    \partials\footer();
} catch (Throwable $e) {
    die("<h1>何かがすごくおかしいようです。</h1>");
}
