<?php

require_once "config.php";

$page = $_GET["page"] ?? "home";

switch ($page) {
    case "home":
        require_once 'php/controllers/home.php';
        break;
    case "log":
        require_once 'php/controllers/log.php';
        break;
    case "user":
        require_once 'php/controllers/user.php';
        break;
    case "help":
        require_once 'php/controllers/help.php';
        break;
    case "settings":
        require_once 'php/controllers/settings.php';
        break;
    case "login":
        require_once 'php/controllers/login.php';
        break;
    case "register":
        require_once 'php/controllers/register.php';
        break;
    default:
        require_once 'php/controllers/404.php';
        break;
}
