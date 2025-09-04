<?php

namespace view\modal\record;

function index()
{
?>
  <div class="modal-record">
    <div class="modal-record__date">
      <button id="date-prev"
        class="date-prev">
        <img src="<?php echo BASE_IMAGE_PATH; ?>date-arrow.svg"
          alt="<" />
      </button>
      <p id="date-contents"
        class="date__contents"></p>
      <button id="date-next"
        class="date-next">
        <img src="<?php echo BASE_IMAGE_PATH; ?>date-arrow.svg"
          alt="<" />
      </button>
    </div>
    <form id="record-form"
      class="record-form validate-form"
      novalidate>
      <div class="record-form__contents basic-info-form__box">
        <div class="validate-form__input">
          <label for="weight"
            class="label-name label-name__weight">体重</label>
          <div class="record-form__input">
            <input type="text"
              id="weight"
              name="weight"
              placeholder="---.-"
              inputmode="decimal"
              data-weight-input
              required> <span class="weight__unit">kg</span>
          </div>
          <div class="validate-text"></div>
        </div>
      </div>
      <div class="record-form__contents">
        <div class="basic-info-form__box">
          <label for="memo">
            <span class="label-name label-name__memo">一言メモ</span>
            <span class="label-att">※30文字以内</span></label>
          <div class="record-form__input">
            <textarea id="memo"
              name="memo"
              rows="1"
              maxlength="30"
              placeholder="例: 今日はたくさん運動した。"></textarea>
          </div>
        </div>
      </div>
      <input type="hidden"
        id="recorded_at"
        name="recorded_at"
        value="">

      <div class="modal-buttons record-form__buttons">
        <div class="modal-buttons__group">
          <button type="button"
            class="close-modal btn btn--cancel"><span class="btn__text">キャンセル</span></button>
          <button type="submit"
            class="btn btn--record submit-btn"><span class="btn__text">記録を追加</span></button>
        </div>
      </div>
    </form>
  </div>
<?php
}
?>