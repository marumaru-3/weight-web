<?php

namespace view\modal\adminUser;

function index()
{
?>
  <button type="button"
    class="close-modal close-logo">
    <span class="material-symbols-outlined" data-icon="add_circle">
      add_circle
    </span>
  </button>
  <div class="user-admin modal-width">
    <h3 class="modal-title">基本情報を編集</h3>
    <form id="user-info-form"
      class="admin-user-form basic-info-form validate-form"
      novalidate>
      <div class="basic-info-form__contents">
        <div class="basic-info-form__box">
          <div class="basic-info-form__input validate-form__input text-on">
            <label for="username"
              class="text-label">
              <div class="label-name">
                ユーザー名
              </div>
              <div class="label-input">
                <input type="text"
                  id="username"
                  name="username"
                  class="validate-target"
                  maxlength="10"
                  required>
              </div>
            </label>
          </div>
          <div class="validate-text"></div>
        </div>

        <div class="basic-info-form__box basic-info-form__date">
          <p class="label-title">生年月日</p>
          <div class="basic-info-form__flex">
            <div class="basic-info-form__input text-on validate-form__input text-on">
              <label for="birth-year"
                class="select-label">
                <div class="label-name">
                  年
                </div>
                <select name="birth-year"
                  id="birth-year"
                  class="label-input"
                  required>
                  <option value
                    disabled
                    selected></option>
                </select>
              </label>
            </div>
            <div class="basic-info-form__input text-on validate-form__input text-on">
              <label for="birth-month"
                class="select-label">
                <div class="label-name">
                  月
                </div>
                <select name="birth-month"
                  id="birth-month"
                  class="label-input"
                  required>
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
            <div class="basic-info-form__input text-on validate-form__input text-on">
              <label for="birth-day"
                class="select-label">
                <div class="label-name">
                  日
                </div>
                <select name="birth-day"
                  id="birth-day"
                  class="label-input"
                  required>
                  <option value
                    disabled
                    selected></option>
                </select>
              </label>
            </div>
          </div>
          <div class="validate-text"></div>
        </div>

        <div class="basic-info-form__box basic-info-form__gender">
          <p class="label-title">性別</p>
          <div class="basic-info-form__flex">
            <div class="basic-info-form__radio">
              <label for="gender-man"
                class="gender-label">
                <input type="radio"
                  id="gender-man"
                  name="gender"
                  value="male"
                  required>
                <div class="radio-name">
                  男性
                </div>
              </label>
            </div>
            <div class="basic-info-form__radio">
              <label for="gender-women"
                class="gender-label">
                <input type="radio"
                  id="gender-women"
                  name="gender"
                  value="female"
                  required>
                <div class="radio-name">
                  女性
                </div>
              </label>
            </div>
            <div class="basic-info-form__radio">
              <label for="gender-other"
                class="gender-label">
                <input type="radio"
                  id="gender-other"
                  name="gender"
                  value="other"
                  required>
                <div class="radio-name">
                  その他
                </div>
              </label>
            </div>
          </div>
          <div class="validate-text"></div>
        </div>

        <div class="basic-info-form__flex">
          <div class="basic-info-form__box">
            <div class="basic-info-form__input validate-form__input text-on">
              <label for="height"
                class="text-label">
                <div class="label-name">
                  身長（cm）
                </div>
                <div class="label-input">
                  <input type="text"
                    id="height"
                    name="height"
                    maxlength="10"
                    step="0.1"
                    inputmode="decimal"
                    pattern="[0-9]+(\.[0-9]+)?"
                    value=""
                    data-float
                    required>
                </div>
              </label>
            </div>
            <div class="validate-text"></div>
          </div>
          <div class="basic-info-form__box">
            <div class="basic-info-form__input validate-form__input text-on">
              <label for="ideal-weight"
                class="text-label">
                <div class="label-name">
                  理想体重（kg）
                </div>
                <div class="label-input">
                  <input type="text"
                    id="ideal-weight"
                    name="ideal-weight"
                    maxlength="10"
                    step="0.1"
                    inputmode="decimal"
                    pattern="[0-9]+(\.[0-9]+)?"
                    value=""
                    data-float
                    required>
                </div>
              </label>
            </div>
            <div class="validate-text"></div>
          </div>
        </div>
      </div>

      <div class="modal-buttons record-form__buttons">
        <div class="modal-buttons__group">
          <button type="button"
            class="close-modal btn btn--cancel"><span class="btn__text">キャンセル</span></button>
          <button type="submit"
            class="btn btn--record submit-btn disabled"
            id="btn--user-admin"
            disabled><span class="btn__text">編集を保存</span></button>
        </div>
      </div>
    </form>
  </div>
<?php
}
?>