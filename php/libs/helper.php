<?php
function get_param($key, $default_val, $is_post = true)
{
  $arry = $is_post ? $_POST : $_GET;
  return $arry[$key] ?? $default_val;
}

function redirect($path)
{
  $path = get_url($path);
  header("Location: {$path}");
  die();
}

function the_url($path)
{
  echo get_url($path);
}

function get_url($path)
{
  return BASE_CONTEXT_PATH . trim($path, "/");
}
