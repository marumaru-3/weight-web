<?php

namespace service;

use lib\weightDaysCalc;
use model\WeightLogModel;

class WeightLogService
{
    public static function getTodayStats($user, $weight_logs)
    {
        $today = date("Y-m-d");

        if (empty($weight_logs)) {
            return self::nullReturn($today);
        }

        $today_logArr = array_filter(
            $weight_logs,
            fn($log) => $log->recorded_at === $today
        );
        $today_log = reset($today_logArr);

        if (empty($today_log)) {
            return self::nullReturn($today);
        }

        $today_weight = $today_log->getFloat($today_log->weight);
        $today_memo = $today_log->memo;

        $today_bmi = null;
        $today_bfp = null;
        $idealDefferWeight = null;

        if (!empty($today_weight)) {
            $height = $user->height;
            $today_bmi = weightDaysCalc::bmi($today_weight, $height);

            $gender = $user->gender;
            $age = age_calc($user->birthdate);
            $today_bfp = weightDaysCalc::bfp($today_bmi, $gender, $age);

            $idealDefferWeight = weightDaysCalc::idealDefferWeight(
                $today_weight,
                $user->ideal_weight
            );
        }

        return [
            "today" => $today,
            "weight" => $today_weight,
            "memo" => $today_memo,
            "bmi" => $today_bmi,
            "bfp" => $today_bfp,
            "idealDefferWeight" => $idealDefferWeight,
        ];
    }

    public static function nullReturn($today)
    {
        return [
            "today" => $today,
            "weight" => null,
            "memo" => null,
            "bmi" => null,
            "bfp" => null,
            "idealDefferWeight" => null,
        ];
    }

    // public static function getByDate($user_id, $date)
    // {
    //   return WeightLogModel::findOneBy([

    //   ])
    // }
}
