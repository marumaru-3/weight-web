<?php

namespace partials;

function head($page_title, $page_desc)
{
?>
  <!DOCTYPE html>
  <html lang="ja">

  <head>
    <?php if (getenv('APP_ENV') === 'production') : ?>
      <!-- Google Tag Manager -->
      <script>
        (function(w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
          });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
          j.async = true;
          j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-NJQ55WGX');
      </script>
      <!-- End Google Tag Manager -->
    <?php endif; ?>

    <meta charset="UTF-8" />
    <meta name="viewport"
      content="width=device-width, initial-scale=1.0" />
    <title><?php echo $page_title; ?> / 体重Web</title>
    <meta name="description" content="<?php echo $page_desc; ?>">
    <meta property="og:title" content="体重Web - シンプルな体重記録アプリ" />
    <meta property="og:description" content="体重を記録するだけで、BMIや体脂肪率・目標体重の差がひと目でわかる！" />
    <meta property="og:image" content="https://www.weight-web.site/images/ogp.png" />
    <meta property="og:url" content="https://www.weight-web.site/" />
    <meta property="og:type" content="website" />
    <meta name="robots" content="noindex, nofollow">
    <link rel="icon"
      href="<?php echo BASE_IMAGE_PATH; ?>favicon/favicon.ico">
    <link rel="preconnect"
      href="https://fonts.googleapis.com">
    <link rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&display=swap"
      rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      rel="stylesheet" />
    <link rel="stylesheet"
      href="<?php echo BASE_ASSETS_PATH; ?>style.css" />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation"></script>

  </head>

  <body>
    <?php if (getenv('APP_ENV') === 'production') : ?>
      <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NJQ55WGX"
          height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->
    <?php endif; ?>

  <?php
}
  ?>