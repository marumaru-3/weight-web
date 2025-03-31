<?php

namespace view\modal\adminAccount;

function index()
{
    ?>
  <div class="user-admin modal-width">
    <h3 class="modal-title">パスワードを変更</h3>
    <p class="modal-text">パスワードには半角英数字を使用してください。</p>
    <form id="user-info-form"
      class="admin-account-form basic-info-form validate-form"
      novalidate>
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
                  autocomplete="current-password"
                  maxlength="30"
                  pattern="[a-zA-Z0-9]+"
                  inputmode="latin"
                  data-alphanumeric
                  required>
                <button type="button"
                  class="btn--pwd pwd-btn"
                  data-hidden="true">
                  <span class="material-symbols-outlined">
                    visibility
                  </span>
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
            パスワードの変更を確認しました。
          </label>
        </div>
      </div>

      <div class="modal-buttons record-form__buttons">
        <div class="modal-buttons__group">
          <button type="button"
            id="close-modal"
            class="btn btn--cancel"><span class="btn__text">キャンセル</span></button>
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
