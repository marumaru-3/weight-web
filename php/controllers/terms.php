<?php

namespace controller\terms;

function get($_)
{
    $page_title = "利用規約";
    $page_desc = "体重Webに関する利用規約が記載されています。";
    \view\terms\index($page_title, $page_desc);
}
