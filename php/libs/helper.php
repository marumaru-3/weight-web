<?php
function get_param($key, $default_val, $is_post = true)
{
  $arry = $is_post ? $_POST : $_GET;
  return $arry[$key] ?? $default_val;
}

function redirect($path)
{
  if ($path === GO_HOME) {
    $path = get_url('');
  } else if ($path === GO_REFERER) {
    $path = $_SERVER['HTTP_REFERER'];
  } else {
    $path = get_url($path);
  }
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

function age_calc($birthdate)
{
  $today = new DateTime();
  $birthDateObj = new DateTime($birthdate);

  $age = $today->diff($birthDateObj)->y;

  if ($today->format('md') < $birthDateObj->format('md')) {
    $age--;
  }

  return $age;
}
