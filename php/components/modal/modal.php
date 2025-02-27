<?php

function modalContents($modal_content)
{
?>
  <div id="modal"
    class="modal">
    <div class="modal__container">
      <?php require_once $modal_content; ?>
    </div>
  </div>
<?php
}

// モーダルの HTML を出力（JavaScriptのfetch用）
if (isset($_GET['fetch']) && $_GET['fetch'] === 'true') {
  $modal_record = __DIR__ . "/record.php";
  modalContents($modal_record);
  exit;
}
