<?php

class DBSessionHandler implements SessionHandlerInterface
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function open(string $savePath, string $sessionName): bool
    {
        return true;
    }

    public function close(): bool
    {
        return true;
    }

    public function read(string $id): string
    {
        $stmt = $this->pdo->prepare(
            "select data from sessions where id = :id;"
        );
        $stmt->execute([":id" => $id]);
        return $stmt->fetchColumn() ?: "";
    }

    public function write(string $id, string $data): bool
    {
        $stmt = $this->pdo->prepare("
        replace into sessions (id, data, timestamp)
        values (:id, :data, :ts)");
        return $stmt->execute([
            ":id" => $id,
            ":data" => $data,
            ":ts" => time(),
        ]);
    }

    public function destroy(string $id): bool
    {
        $stmt = $this->pdo->prepare("delete from sessions where id = :id");
        return $stmt->execute([":id" => $id]);
    }

    public function gc(int $maxlifetime): int|false
    {
        $stmt = $this->pdo->prepare("delete from sessions where id = :id");
        return $stmt->execute([":id" => $maxlifetime]);
    }
}
