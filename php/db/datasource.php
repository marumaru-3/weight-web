<?php

namespace db;

use PDO;

class DataSource
{
    private $conn;
    private $sqlResult;
    public const CLS = "cls";

    public function __construct(
        $host = null,
        $port = null,
        $dbName = null,
        $username = null,
        $password = null
    ) {
        // デフォルト値は環境変数から取得 or ローカル開発用に fallback
        $host = $host ?? getenv("DB_HOST") ?: "localhost";
        $port = $port ?? getenv("DB_PORT") ?: "8889";
        $dbName = $dbName ?? getenv("DB_NAME") ?: "weightweb";
        $username = $username ?? getenv("DB_USERNAME") ?: "develop_user";
        $password = $password ?? getenv("DB_PASSWORD") ?: "developKaihatsu0310";

        $dsn = "mysql:host={$host};port={$port};dbname={$dbName};";
        $this->conn = new PDO($dsn, $username, $password);
        $this->conn->setAttribute(
            PDO::ATTR_DEFAULT_FETCH_MODE,
            PDO::FETCH_ASSOC
        );
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }

    public function select($sql = "", $params = [], $type = "", $cls = "")
    {
        $stmt = $this->executeSql($sql, $params);
        if ($type === static::CLS) {
            return $stmt->fetchAll(PDO::FETCH_CLASS, $cls);
        } else {
            return $stmt->fetchAll();
        }
    }

    public function selectOne($sql = "", $params = [], $type = "", $cls = "")
    {
        $result = $this->select($sql, $params, $type, $cls);
        return count($result) > 0 ? $result[0] : false;
    }

    public function execute($sql = "", $params = [])
    {
        $this->executeSql($sql, $params);
        return $this->sqlResult;
    }

    public function begin()
    {
        $this->conn->beginTransaction();
    }

    public function commit()
    {
        $this->conn->commit();
    }

    public function rollback()
    {
        $this->conn->rollBack();
    }

    private function executeSql($sql, $params)
    {
        $stmt = $this->conn->prepare($sql);
        $this->sqlResult = $stmt->execute($params);
        return $stmt;
    }

    public function getPdo()
    {
        return $this->conn;
    }
}
