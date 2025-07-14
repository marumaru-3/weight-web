<?php
require_once __DIR__ . "/../../config/config.php";

require_once SOURCE_BASE . "globals/DBSessionHandler.php";

require_once SOURCE_BASE . "libs/Auth.php";
require_once SOURCE_BASE . "libs/WeightDaysCalc.php";

require_once SOURCE_BASE . "functions/helper.php";

require_once SOURCE_BASE . "models/abstract.model.php";
require_once SOURCE_BASE . "models/user.model.php";
require_once SOURCE_BASE . "models/weight_log.model.php";

require_once SOURCE_BASE . "libs/Msg.php";

require_once SOURCE_BASE . "db/datasource.php";
require_once SOURCE_BASE . "db/user.query.php";
require_once SOURCE_BASE . "db/weight_log.query.php";

use db\DataSource;

$handler = new DBSessionHandler((new DataSource())->getPdo());
session_set_save_handler($handler, true);
session_start();
