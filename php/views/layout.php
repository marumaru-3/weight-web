<?php

namespace view\layout;

use lib\Msg;

function dashboard($page, $page_title, $page_desc, $user = null, $weight_logs = null)
{
  \partials\head($page_title, $page_desc); ?>
  <div id="layout"
    class="layout">
    <?php \partials\sidebar($page); ?>
    <div class="layout__content">
      <?php \partials\header($user); ?>
      <main class="layout__main">
        <?php Msg::flush(); ?>
        <?php
        $fn = "\\view\\{$page}\\index";
        if (!empty($user) && !empty($weight_logs)) {
          $fn($page_title, $user, $weight_logs);
        } elseif (!empty($user)) {
          $fn($page_title, $user);
        } elseif (!empty($weight_logs)) {
          $fn($page_title, $weight_logs);
        } else {
          $fn($page_title);
        } ?>
      </main>
    </div>
  </div>

<?php
}
?>