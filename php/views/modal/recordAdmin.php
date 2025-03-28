<?php

namespace view\modal\recordAdmin;

function index()
{
    ?>
  <div class="modal-record-admin">
    <div class="modal-record-admin__date">
      <p class="date__contents"></p>
    </div>
    <form id="record-form"
      class="record-form validate-form"
      novalidate>
      <div class="record-form__contents validate-form__input">
        <label for="weight"
          class="label-name">体重</label>
        <div class="basic-info-form__box">
          <div class="record-form__input">
            <input type="number"
              id="weight"
              name="weight"
              placeholder="例： 68.4"
              step="0.1"
              value=""
              required> <span class="weight__unit">kg</span>
          </div>
          <div class="validate-text"></div>
        </div>
      </div>
      <div class="record-form__contents">
        <label for="memo"
          class="label-name">一言メモ <span class="label-att">※30文字以内</span></label>
        <div class="record-form__input">
          <textarea id="memo"
            name="memo"
            rows="1"
            maxlength="30"
            placeholder="例: 今日はたくさん運動した。"></textarea>
        </div>
      </div>

      <div class="modal-buttons">
        <button type="button"
          class="btn btn--att-color-01"><span class="btn__text">削除</span></button>
        <div class="modal-buttons__group">
          <button type="button"
            id="close-modal"
            class="btn btn--cancel"><span class="btn__text">キャンセル</span></button>
          <button type="submit"
            class="btn btn--record submit-btn"><span class="btn__text">編集を保存</span></button>
        </div>
      </div>
    </form>
  </div>
<?php
}
?>
