<?php

// require_once "../../../config.php";
// require_once "../../models/abstract.model.php";
// require_once "../../models/user.model.php";
// require_once "../../db/datasource.php";
// require_once "../../db/user.query.php";

// session_start();

// if (!isset($_GET["fetch"]) || !isset($_GET["modal"])) {
//   http_response_code(400);
//   echo "Invalid request";
//   exit();
// }

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
