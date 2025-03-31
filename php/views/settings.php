<?php

namespace view\settings;

function index($page_title, $user)
{
    ?>
  <div class="page settings">
    <h2 class="page-title"><?php echo $page_title; ?></h2>
    <div class="settings-block card">
      <h3 class="settings-block__title contents-title">アカウント設定</h3>
      <div class="settings-block__item copy-contents">
        <p class="settings-block__label copy-link">
          ID
          <span class="material-symbols-outlined">
            content_copy
          </span>
        </p>
        <p class="settings-block__value copy__value">
          <?php echo $user->id; ?>
        </p>
      </div>
      <div class="settings-btns">
        <button class="btn btn--att-color-01"
          data-modal="accountDelete">
          <span class="btn__text">アカウントの削除</span>
        </button>
        <button class="btn btn--att-color-02"
          data-modal="recordReset">
          <span class="btn__text">体重記録の初期化</span>
        </button>
      </div>
    </div>
  </div>
<?php
}
?>
