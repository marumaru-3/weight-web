<?php

namespace lib;

use Throwable;

use model\UserModel;

function page_route($page, $method)
{
    try {
        $targetFile = SOURCE_BASE . "controllers/{$page}.php";

        if (!file_exists($targetFile)) {
            require_once SOURCE_BASE . "views/404.php";
            return;
        }

        require_once $targetFile;

        $page = str_replace("/", "\\", $page);
        $fn = "\\controller\\{$page}\\{$method}";

        $fn($page);
    } catch (Throwable $e) {
        Msg::push(Msg::DEBUG, $e->getMessage());
        Msg::push(Msg::ERROR, "何かがおかしいようです。。");
        redirect("404");
    }
}

function modal_route($modal, $method, $user = null)
{
    try {
        $targetFile = SOURCE_BASE . "controllers/modals/{$modal}.php";

        if (!file_exists($targetFile)) {
            require_once SOURCE_BASE . "views/404.php";
            return;
        }

        require_once $targetFile;

        $modal = str_replace("/", "\\", $modal);
        $fn = "\\controller\\modal\\{$modal}\\{$method}";

        if ($modal === "record") {
            $fn($user);
        } else {
            $fn();
        }
    } catch (Throwable $e) {
        Msg::push(Msg::DEBUG, $e->getMessage());
        Msg::push(Msg::ERROR, "何かがおかしいようです。。");
        redirect("404");
    }
}
