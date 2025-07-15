<?php

namespace model;

use Error;

// 継承しないと使えないクラス
abstract class AbstractModel
{
    protected static $SESSION_NAME = null;
    public static function setSession($val)
    {
        if (empty(static::$SESSION_NAME)) {
            throw new Error('$SESSION_NAMEを設定してください。');
        }
        $_SESSION[static::$SESSION_NAME] = $val;
    }

    public static function getSession()
    {
        return $_SESSION[static::$SESSION_NAME] ?? null;
    }

    public static function clearSession()
    {
        static::setSession(null);
    }

    public static function getSessionAndFlush()
    {
        try {
            return static::getSession();
        } finally {
            static::clearSession();
        }
    }

    public static function getFloat($val)
    {
        return number_format($val, 1, '.', '');
    }

    public static function getDate($val, $isKanji = false)
    {
        $timestamp = strtotime($val);

        $dateSlash = date("Y/m/d", $timestamp);
        $dateKanji = date("Y年m月d日", $timestamp);

        return $isKanji ? $dateKanji : $dateSlash;
    }
}
