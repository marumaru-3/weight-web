<?php

namespace view\modal\accountDelete;

function index()
{
?>
  <button type="button"
    class="close-modal close-logo">
    <span class="material-symbols-outlined" data-icon="add_circle"></span>
  </button>
  <div class="account-delete modal-width">
    <h3 class="modal-title">本当にアカウントを削除しますか？</h3>
    <div class="modal-att modal-att--settings">
      <p class="modal-att__label">注意！</p>
      <p class="modal-att__text modal-att__text--height">
        以下のデータが完全に消去されます。<br>
        ・体重記録<br>
        ・アカウント情報（ID、生年月日など）<br>
        ・その他の設定情報<br>
        一度削除すると、データの復元はできません。
      </p>
      <p class="modal-att__text--last">
        本当に削除しますか？
      </p>
    </div>
    <div class="basic-info-form">
      <div class="modal-buttons record-form__buttons">
        <div class="modal-buttons__group--columns">
          <button
            class="close-modal btn btn--cancel submit-btn btn--w-100"><span class="btn__text">キャンセル</span></button>
          <button type="submit"
            class="btn btn--acc-delete submit-btn btn--w-100"
            id="acc-delete-btn"><span class="btn__text">アカウントを削除する</span></button>
        </div>
      </div>
    </div>
  </div>
<?php
}
?>