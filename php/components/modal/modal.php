<?php function modalContents($modal_content)
{
    ?>
<div id="modal"
     class="modal">
  <div class="modal__container">
    <?php require_once $modal_content; ?>
  </div>
</div>
<?php
} ?>
