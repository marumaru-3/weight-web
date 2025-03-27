<?php

namespace model;

class WeightLogModel extends AbstractModel
{
    public int $id;
    public int $user_id;
    public float $weight;
    public string $memo;
    public string $recorded_at;
    public string $created_at;
    public string $updated_at;

    protected static $SESSION_NAME = "_weight_log";
}
