<?php

namespace controller\welcome;

function get($_)
{
    $page_title = "ようこそ！";
    $page_desc = "体重を記録するだけで、BMI・推定体脂肪率・目標体重との差がすぐにわかる体重管理アプリ。毎日の記録をグラフで見やすく可視化。シンプルで続けやすい健康習慣に。";
    \view\welcome\index($page_title, $page_desc);
}
