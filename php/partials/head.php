<?php

namespace partials;

function head($page_title)
{
?>
  <!DOCTYPE html>
  <html lang="ja">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport"
      content="width=device-width, initial-scale=1.0" />
    <title><?php echo $page_title; ?> / 体重Web</title>
    <link rel="icon" href="<?php echo BASE_IMAGE_PATH; ?>favicon/favicon.ico">
    <link rel="preconnect"
      href="https://fonts.googleapis.com">
    <link rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&display=swap"
      rel="stylesheet">
    <link rel="stylesheet"
      href="<?php echo BASE_CSS_PATH; ?>style.css" />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation"></script>

  </head>

  <body>
  <?php
}
  ?>