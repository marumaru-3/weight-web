<?php

require_once "config.php";

$page = $_GET["page"] ?? "home";

switch ($page) {
    case "home":
        $page_title = "ホーム";
        $page_content = SOURCE_BASE . "views/home.php";
        break;
    case "log":
        $page_title = "体重ログ";
        $page_content = SOURCE_BASE . "views/log.php";
        break;
    case "user":
        $page_title = "ユーザー情報";
        $page_content = SOURCE_BASE . "views/user.php";
        break;
    case "help":
        $page_title = "ヘルプ";
        $page_content = SOURCE_BASE . "views/help.php";
        break;
    case "settings":
        $page_title = "設定";
        $page_content = SOURCE_BASE . "views/settings.php";
        break;
    default:
        $page_title = "ページが見つかりません";
        $page_content = SOURCE_BASE . "views/404.php";
        break;
}

require_once SOURCE_BASE . "views/layout.php";
