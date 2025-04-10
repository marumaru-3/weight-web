<?php

namespace view\modal\recordReset;

function index()
{
?>
  <button type="button"
    class="close-modal close-logo">
    <span class="material-symbols-outlined" data-icon="add_circle"></span>
  </button>
  <div class="record-reset modal-width">
    <h3 class="modal-title">本当に体重記録を初期化しますか？</h3>
    <div class="modal-att modal-att--settings">
      <p class="modal-att__label">注意！</p>
      <p class="modal-att__text modal-att__text--height">
        初期化をすると、以下のデータが完全に消去されます。<br>
        ・今までの体重とメモの記録<br>
        一度初期化すると、データの復元はできません。
      </p>
      <p class="modal-att__text--last">
        本当に初期化しますか？
      </p>
    </div>
    <div class="basic-info-form">
      <div class="modal-buttons record-form__buttons">
        <div class="modal-buttons__group--columns">
          <button
            class="close-modal btn btn--cancel submit-btn btn--w-100"><span class="btn__text">キャンセル</span></button>
          <button type="submit"
            class="btn btn--rec-reset submit-btn btn--w-100"
            id="reset-btn"><span class="btn__text">体重記録を初期化する</span></button>
        </div>
      </div>
    </div>
  </div>
<?php
}
?>