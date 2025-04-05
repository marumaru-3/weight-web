<?php
define("BASE_CONTEXT_PATH", "/" . basename(__DIR__) . "/");

define("BASE_IMAGE_PATH", BASE_CONTEXT_PATH . "images/");
define("BASE_JS_PATH", BASE_CONTEXT_PATH . "js/");
define("BASE_CSS_PATH", BASE_CONTEXT_PATH . "css/");
define("SOURCE_BASE", __DIR__ . "/php/");

define('GO_HOME', 'home');
define('GO_REFERER', 'referer');

define("DEBUG", true);

$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
  $dotenv = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  foreach ($dotenv as $line) {
    if (strpos(trim($line), '#') === 0) continue;
    list($key, $value) = explode('=', $line, 2);
    putenv(trim($key) . '=' . trim($value));
  }
}
