<?php
$dsn = "mysql:host=localhost;port=8889;dbname=weightweb;charset=utf8mb4";
$username = "develop_user";
$password = "developKaihatsu0310";

try {
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    echo "接続成功！";
} catch (PDOException $e) {
    echo "接続失敗：" . $e->getMessage();
}
