<?php

namespace view\layout;

use lib\Msg;

function dashboard($page, $page_title, $user = null, $weight_logs = null)
{
  \partials\head($page_title);
?>
  <div id="layout"
    class="layout">
    <?php \partials\sidebar($page); ?>
    <div class="layout__content">
      <?php \partials\header(); ?>
      <main class="layout__main">
        <?php Msg::flush(); ?>
        <?php
        $fn = "\\view\\{$page}\\index";
        if (!empty($user) && !empty($weight_logs)) {
          $fn($page_title, $user, $weight_logs);
        } else if (!empty($user)) {
          $fn($page_title, $user);
        } else if (!empty($weight_logs)) {
          $fn($page_title, $weight_logs);
        } else {
          $fn($page_title);
        }
        ?>
      </main>
    </div>
  </div>

<?php
}
?>