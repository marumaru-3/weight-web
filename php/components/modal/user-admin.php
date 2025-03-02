<div class="user-admin modal-width">
  <h3 class="modal-title">基本情報を編集</h3>
  <form id="basic-info-form"
    class="basic-info-form">
    <div class="basic-info-form__contents">
      <div class="basic-info-form__input">
        <label for="username"
          class="text-label">
          <div class="label-name">
            ユーザー名
          </div>
          <div class="label-input">
            <input type="text"
              id="username"
              maxlength="10">
          </div>
        </label>
      </div>

      <div class="basic-info-form__date">
        <p class="label-title">生年月日</p>
        <div class="basic-info-form__flex">
          <div class="basic-info-form__input text-on">
            <label for="year"
              class="select-label">
              <div class="label-name">
                年
              </div>
              <select name="year"
                id="year"
                class="label-input">
                <option value
                  disabled
                  selected></option>
              </select>
            </label>
          </div>
          <div class="basic-info-form__input text-on">
            <label for="month"
              class="select-label">
              <div class="label-name">
                月
              </div>
              <select name="month"
                id="month"
                class="label-input">
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
            </label>
          </div>
          <div class="basic-info-form__input text-on">
            <label for="day"
              class="select-label">
              <div class="label-name">
                日
              </div>
              <select name="day"
                id="day"
                class="label-input">
                <option value
                  disabled
                  selected></option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div class="basic-info-form__flex">
        <div class="basic-info-form__input">
          <label for="height"
            class="text-label">
            <div class="label-name">
              身長（cm）
            </div>
            <div class="label-input">
              <input type="number"
                id="height"
                maxlength="10">
            </div>
          </label>
        </div>
        <div class="basic-info-form__input">
          <label for="ideal-weight"
            class="text-label">
            <div class="label-name">
              理想体重（kg）
            </div>
            <div class="label-input">
              <input type="number"
                id="ideal-weight"
                maxlength="10">
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="modal-buttons record-form__buttons">
      <div class="modal-buttons__group">
        <button type="button"
          id="close-modal"
          class="btn btn--cancel"><span class="btn__text">キャンセル</span></button>
        <button type="submit"
          class="btn btn--record"><span class="btn__text">編集を保存</span></button>
      </div>
    </div>
  </form>
</div>