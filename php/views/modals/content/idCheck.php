<?php

namespace view\modal\idCheck;

function index($user)
{
    ?>
  <div class="id-check modal-width">
    <h3 class="modal-title">IDをどこかに保管していますか？</h3>
    <div class="modal-att">
      <p class="modal-att__label">注意！</p>
      <p class="modal-att__text">IDとパスワードを忘れてしまうと、データにアクセスできなくなりますので、必ずメモやスクリーンショットで保存してください。※パスワードはユーザー情報ページで変更可能</p>
    </div>
    <div class="modal-id copy-contents">
      <p class="modal-id__label copy-link">
        ID
        <span class="material-symbols-outlined">
          content_copy
        </span>
      </p>
      <p class="modal-id__value copy__value"><?php echo $user->id; ?></p>
    </div>
    <div class="modal-buttons record-form__buttons">
      <div class="modal-buttons__group--columns">
        <button type="submit"
          class="close-modal btn btn--record submit-btn btn--w-100"><span class="btn__text">閉じる</span></button>
      </div>
    </div>
  </div>
<?php
}
?>
