<?php

namespace view\modal\modal;

function modalContents($modal_content, $user = null, $weight_log = null)
{
    ?>
  <div id="modal"
    class="modal">
    <div class="modal__container">
      <?php
      $fn = "\\view\\modal\\{$modal_content}\\index";
      if (!empty($user) && !empty($weight_log)) {
          $fn($user, $weight_log);
      } elseif (!empty($user)) {
          $fn($user);
      } elseif (!empty($weight_log)) {
          $fn($weight_log);
      } else {
          $fn();
      }?>
    </div>
  </div>
<?php
}
