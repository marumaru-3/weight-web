<?php

namespace db;

use db\DataSource;
use model\NoticeReadModel;

class NoticeReadQuery
{
    public static function fetchByUserId($user_id)
    {
        $db = new DataSource();
        $sql = "select * from notice_reads where user_id = :user_id;";
        $result = $db->selectOne(
            $sql,
            [
                ":user_id" => $user_id,
            ],
            DataSource::CLS,
            NoticeReadModel::class
        );
        return $result;
    }

    public static function upsertLastReadAt($user_id)
    {
        $db = new DataSource();
        $sql = "insert into notice_reads (user_id, last_read_at) values (:user_id, now()) on duplicate key update last_read_at = now()";
        return $db->execute($sql, [":user_id" => $user_id]);
    }
}
