<?php

namespace model;

class UserModel extends AbstractModel
{
    public int $id;
    public string $password;
    public string $username;
    public string $birthdate;
    public string $gender;
    public float $height;
    public float $ideal_weight;
    public string $id_display;
    public ?string $last_login_at;
    public ?string $created_at;
    public string $updated_at;

    protected static $SESSION_NAME = "_user";

    public static function getGender($gender)
    {
        if ($gender === "male") {
            return "男性";
        } elseif ($gender === "female") {
            return "女性";
        } else {
            return "その他";
        }
    }
}
