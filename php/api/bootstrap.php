<?php
require_once __DIR__ . "/../../config.php";

require_once SOURCE_BASE . "libs/weight-days_calc.php";
require_once SOURCE_BASE . "libs/helper.php";
require_once SOURCE_BASE . "libs/auth.php";

require_once SOURCE_BASE . "models/abstract.model.php";
require_once SOURCE_BASE . "models/user.model.php";
require_once SOURCE_BASE . "models/weight_log.model.php";

require_once SOURCE_BASE . "libs/message.php";

require_once SOURCE_BASE . "db/datasource.php";
require_once SOURCE_BASE . "db/user.query.php";
require_once SOURCE_BASE . "db/weight_log.query.php";

use lib\Auth;
use model\UserModel;

session_start();

Auth::requireLogin(true);
$user = UserModel::getSession();

header("Content-Type: application/json");
