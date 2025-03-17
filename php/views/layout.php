<?php require_once SOURCE_BASE . "components/head.php"; ?>


<div id="layout"
  class="layout">
  <?php include "./php/components/sidebar.php"; ?>
  <div class="layout__content">
    <?php include "./php/components/header.php"; ?>
    <main class="layout__main">
      <?php
      use lib\Auth;

      use lib\Msg;

      Msg::flush();

      if (Auth::isLogin()) {
          echo "ログイン中です。";
      } else {
          echo "ログインしていません。";
      }
      ?>
      <?php require_once $page_content; ?>
    </main>
  </div>
</div>

<?php require_once SOURCE_BASE . "components/footer.php"; ?>
