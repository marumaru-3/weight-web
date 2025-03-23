<?php

namespace controller\welcome;

function get($page)
{
  $page_title = "ようこそ！";
  \view\welcome\index($page, $page_title);
}
