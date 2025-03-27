<?php

namespace view\modal\modal;

function modalContents($modal_content, $user = null, $weight_logs = null)
{
?>
  <div id="modal"
    class="modal">
    <div class="modal__container">
      <?php
      $fn = "\\view\\modal\\{$modal_content}\\index";
      if (!empty($user) && !empty($weight_logs)) {
        $fn($user, $weight_logs);
      } elseif (!empty($user)) {
        $fn($user);
      } elseif (!empty($weight_logs)) {
        $fn($weight_logs);
      } else {
        $fn();
      }
      ?>
    </div>
  </div>
<?php
}
