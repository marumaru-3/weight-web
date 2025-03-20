<?php

namespace lib;

use Throwable;

function page_route($page, $method)
{
  try {
    $targetFile = SOURCE_BASE . "controllers/{$page}.php";

    if (!file_exists($targetFile)) {
      require_once SOURCE_BASE . "views/404.php";
      return;
    }

    require_once $targetFile;

    $fn = "\\controller\\{$page}\\{$method}";

    $fn($page);
  } catch (Throwable $e) {
    Msg::push(Msg::DEBUG, $e->getMessage());
    Msg::push(Msg::ERROR, '何かがおかしいようです。。');
    require_once SOURCE_BASE . "views/404.php";
  }
}

function modal_route($modal, $method)
{
  try {
    $targetFile = SOURCE_BASE . "controllers/modal/{$modal}.php";

    if (!file_exists($targetFile)) {
      require_once SOURCE_BASE . "views/404.php";
      return;
    }

    require_once $targetFile;

    $fn = "\\controller\\{$modal}\\{$method}";

    $fn();
  } catch (Throwable $e) {
    Msg::push(Msg::DEBUG, $e->getMessage());
    Msg::push(Msg::ERROR, '何かがおかしいようです。。');
    // require_once SOURCE_BASE . "views/404.php";
  }
}
