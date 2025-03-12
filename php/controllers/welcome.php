<?php

namespace controller\welcome;

function get($page)
{
  $page_title = "ようこそ！";
  require_once SOURCE_BASE . "views/welcome.php";
}
