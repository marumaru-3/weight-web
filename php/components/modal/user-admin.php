<div class="user-admin modal-width">
  <h3 class="modal-title">基本情報を編集</h3>
  <form id="basic-info-form"
    class="basic-info-form">
    <div class="basic-info-form__contents">
      <div class="basic-info-form__input">
        <label for="name">ユーザー名</label>
        <input type="text"
          id="name"
          maxlength="10">
      </div>

      <div class="basic-info-form__date">
        <p class="label-title">生年月日</p>
        <div class="basic-info-form__flex">
          <div class="basic-info-form__input">
            <label for="year">年</label>
            <select name="year"
              id="year">
            </select>
          </div>
          <div class="basic-info-form__input">
            <label for="month">月</label>
            <select name="month"
              id="month">
              <?php for ($i = 0; $i <= 12; $i++): ?>
                <?php if ($i < 1): ?>
                  <option value
                    disabled
                    selected></option>
                <?php else: ?>
                  <option value="<?php echo $i; ?>"><?php echo $i; ?></option>
                <?php endif; ?>
              <?php endfor; ?>
            </select>
          </div>
          <div class="basic-info-form__input">
            <label for="day">日</label>
            <select name="day"
              id="day">
            </select>
          </div>
        </div>
      </div>
      <div class="basic-info-form__flex">
        <div class="basic-info-form__input">
          <label for="name">身長</label>
          <input type="text"
            id="name"
            maxlength="10">
        </div>
        <div class="basic-info-form__input">
          <label for="name">理想体重</label>
          <input type="text"
            id="name"
            maxlength="10">
        </div>
      </div>
    </div>

    <div class="modal-buttons record-form__buttons">
      <div class="modal-buttons__group">
        <button type="button"
          id="close-modal"
          class="btn btn--cancel"><span class="btn__text">キャンセル</span></button>
        <button type="submit"
          class="btn btn--record"><span class="btn__text">記録を追加</span></button>
      </div>
    </div>
  </form>
</div>