<?php

namespace view\modal\register;

function index()
{
    ?>
  <button type="button"
    class="close-modal close-logo">
    <span class="material-symbols-outlined"
      data-icon="add_circle"></span>
  </button>
  <div class="user-admin modal-width">
    <h3 class="modal-title">アカウントを作成</h3>
    <p class="form-message"></p>
    <form id="register-form"
      class="basic-info-form validate-form"
      novalidate>

      <div id="step1"
        class="step visible">
        <p class="modal-text">パスワードには半角英数字記号を使用してください。</p>
        <div class="basic-info-form__contents">
          <input type="text"
            name="username"
            autocomplete="username"
            style="display: none;">
          <div class="basic-info-form__box">
            <div class="basic-info-form__input validate-form__input">
              <label for="password"
                class="text-label">
                <div class="label-name">
                  パスワード
                </div>
                <div class="label-input pwd">
                  <input type="password"
                    name="password"
                    id="password"
                    class="validate-target"
                    maxlength="30"
                    inputmode="latin"
                    data-alphanumeric
                    autocomplete="current-password"
                    required>
                  <button type="button"
                    class="btn--pwd pwd-btn"
                    data-hidden="true">
                    <span class="material-symbols-outlined"
                      data-icon="visibility"></span>
                  </button>
                </div>
              </label>
            </div>
            <div class="validate-text"></div>
          </div>

          <div class="basic-info-form__checkbox">
            <input type="checkbox"
              id="password-check"
              name="password-check"
              required>
            <label for="password-check"
              class="checkbox-label">
              パスワードの値を確認しました。
            </label>
          </div>
        </div>
        <div class="modal-buttons">
          <div class="modal-buttons__group--columns">
            <button type="button"
              class="btn btn--account next-btn submit-btn btn--w-100 disabled"
              id="btn--go-to-step2"
              disabled><span class="btn__text">次に進む</span></button>
          </div>
        </div>
      </div>
      <div id="step2"
        class="step hidden">
        <div class="basic-info-form__contents">
          <div class="basic-info-form__box">
            <div class="basic-info-form__input validate-form__input">
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
              <div class="basic-info-form__input text-on validate-form__input">
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
              <div class="basic-info-form__input text-on validate-form__input">
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
              <div class="basic-info-form__input text-on validate-form__input">
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
              <div class="basic-info-form__input validate-form__input">
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
              <div class="basic-info-form__input validate-form__input">
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
        <div class="modal-buttons">
          <div class="modal-buttons__group--columns">
            <button type="submit"
              class="btn btn--account submit-btn btn--w-100 disabled"
              id="btn--user-register"
              disabled><span class="btn__text">アカウントを作成</span></button>
            <button type="button"
              class="btn btn--cancel prev-btn btn--w-100"
              id="btn--back-to-step1"><span class="btn__text">前に戻る</span></button>
          </div>
        </div>
      </div>
    </form>
  </div>
<?php
}
?>
