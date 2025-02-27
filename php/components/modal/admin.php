<div class="modal-record">
  <div class="modal-record__date">
    <button class="date-prev">
      <img src="./images/date-arrow.svg"
        alt="<" />
    </button>
    <p class="date__contents">2025/01/07</p>
    <button class="date-next">
      <img src="./images/date-arrow.svg"
        alt="<" />
    </button>
  </div>
  <form id="record-form"
    class="record-form">
    <div class="record-form__contents">
      <label for="weight">体重</label>
      <div class="record-form__input">
        <input type="number"
          id="weight"
          name="weight"
          placeholder="例： 68.4"
          step="0.1"
          required> <span class="weight__unit">kg</span>
      </div>
    </div>
    <div class="record-form__contents">
      <label for="memo">一言メモ <span class="label-att">※30文字以内</span></label>
      <div class="record-form__input">
        <textarea id="memo"
          name="memo"
          rows="1"
          placeholder="例: 今日はたくさん運動した。"></textarea>
      </div>
    </div>

    <div class="modal-buttons record-form__buttons">
      <div class="modal-buttons__group">
        <button type="button"
          id="close-modal"
          class="btn btn--cancel">キャンセル</button>
        <button type="submit"
          class="btn btn--record"><span class="btn__text">記録を追加</span></button>
      </div>
    </div>
  </form>
</div>