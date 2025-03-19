<?php

// モーダルのタイプを取得
$modal_type = $_GET["modal"];

$modal_file = __DIR__ . "/{$modal_type}.php";

if (!file_exists($modal_file)) {
  http_response_code(404);
  echo "Modal not found";
  exit();
}

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

modalContents($modal_file);
