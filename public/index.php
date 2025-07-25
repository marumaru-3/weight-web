<?php

require_once __DIR__ . "/../config/config.php";

// Config
require_once SOURCE_BASE . '../config/notices.php';

// Globals
require_once SOURCE_BASE . "globals/DBSessionHandler.php";

// Library
require_once SOURCE_BASE . "libs/Auth.php";
require_once SOURCE_BASE . "libs/WeightDaysCalc.php";

// Functions
require_once SOURCE_BASE . "functions/helper.php";
require_once SOURCE_BASE . "functions/router.php";
require_once SOURCE_BASE . "functions/notice.php";
require_once SOURCE_BASE . "functions/validators.php";

// Models
require_once SOURCE_BASE . "models/abstract.model.php";
require_once SOURCE_BASE . "models/user.model.php";
require_once SOURCE_BASE . "models/weight_log.model.php";
require_once SOURCE_BASE . "models/notice_read.model.php";

// Service
require_once SOURCE_BASE . "service/WeightLogService.php";

// Message
require_once SOURCE_BASE . "libs/Msg.php";

// DB
require_once SOURCE_BASE . "db/datasource.php";
require_once SOURCE_BASE . "db/user.query.php";
require_once SOURCE_BASE . "db/weight_log.query.php";
require_once SOURCE_BASE . "db/notice_read.query.php";

// Partials
require_once SOURCE_BASE . "partials/weight-days-block.php";
require_once SOURCE_BASE . "partials/head.php";
require_once SOURCE_BASE . "partials/header.php";
require_once SOURCE_BASE . "partials/sidebar.php";
require_once SOURCE_BASE . "partials/footer.php";

// View
require_once SOURCE_BASE . "views/layout.php";
require_once SOURCE_BASE . "views/home.php";
require_once SOURCE_BASE . "views/logs.php";
require_once SOURCE_BASE . "views/user.php";
require_once SOURCE_BASE . "views/help.php";
require_once SOURCE_BASE . "views/settings.php";
require_once SOURCE_BASE . "views/welcome.php";
require_once SOURCE_BASE . "views/terms.php";

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
require_once SOURCE_BASE . "views/modals/content/notifications.php";

use db\DataSource;
use function lib\page_route;
use function lib\modal_route;

$handler = new DBSessionHandler((new DataSource())->getPdo());
session_set_save_handler($handler, true);
session_start();

date_default_timezone_set("Asia/Tokyo");

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
