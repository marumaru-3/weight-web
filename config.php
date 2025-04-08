<?php
// Heroku用：JAWSDB_URL を環境変数に分解
if (getenv("JAWSDB_URL")) {
  $url = parse_url(getenv("JAWSDB_URL"));
  putenv("DB_HOST=" . $url["host"]);
  putenv("DB_PORT=" . ($url["port"] ?? 3306));
  putenv("DB_NAME=" . ltrim($url["path"], "/"));
  putenv("DB_USERNAME=" . $url["user"]);
  putenv("DB_PASSWORD=" . $url["pass"]);
}

// ローカル用：.envファイルがあれば読み込む
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
  $dotenv = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  foreach ($dotenv as $line) {
    if (strpos(trim($line), '#') === 0) continue;
    list($key, $value) = explode('=', $line, 2);
    putenv(trim($key) . '=' . trim($value));
  }
}

// URL用のベースパス（Herokuやローカルで動的に変わる）
$scriptName = $_SERVER['SCRIPT_NAME'];
$basePath = rtrim(str_replace(basename($scriptName), '', $scriptName), '/');
define("BASE_CONTEXT_PATH", $basePath . "/");

define("BASE_IMAGE_PATH", BASE_CONTEXT_PATH . "images/");
define("BASE_SRC_PATH", BASE_CONTEXT_PATH . "src/");
define("BASE_PUBLIC_PATH", BASE_CONTEXT_PATH . "public/");
define("SOURCE_BASE", __DIR__ . "/php/");

define('GO_HOME', 'home');
define('GO_REFERER', 'referer');

define("DEBUG", true);
