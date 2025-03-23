<?php

namespace view\modal\modal;

function modalContents($modal_content, $user = null)
{
?>
  <div id="modal"
    class="modal">
    <div class="modal__container">
      <?php
      $fn = "\\view\\modal\\{$modal_content}\\index";
      empty($user) ? $fn() : $fn($user);
      ?>
    </div>
  </div>
<?php
}
