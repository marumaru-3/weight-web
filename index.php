<?php
$page = $_GET["page"] ?? "home";

switch ($page) {
    case "home":
        $page_title = "ホーム";
        $page_content = __DIR__ . "/php/views/home.php";
        break;
    case "log":
        $page_title = "体重ログ";
        $page_content = __DIR__ . "/php/views/log.php";
        break;
    case "user":
        $page_title = "ユーザー情報";
        $page_content = __DIR__ . "/php/views/user.php";
        break;
    default:
        $page_title = "ページが見つかりません";
        $page_content = __DIR__ . "/php/views/404.php";
        break;
}

require_once __DIR__ . "/php/views/layout.php";
