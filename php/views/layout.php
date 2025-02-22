<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>体重Web トップページ</title>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <link rel="stylesheet" href="./css/style.css" />
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body>
  <div class="layout">
    <?php include './php/components/sidebar.php'; ?>
    <div class="layout__content">
      <?php include './php/components/header.php'; ?>
      <main class="layout__main">
        <?php include 'home.php'; ?>
      </main>
    </div>
  </div>

  <script src="./js/layout.js"></script>
  <script src="./js/graph.js"></script>
</body>

</html>