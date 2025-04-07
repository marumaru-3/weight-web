<?php

namespace view\modal\login;

function index()
{
?>
  <button type="button"
    class="close-modal close-logo">
    <span class="material-symbols-outlined" data-icon="add_circle">
      add_circle
    </span>
  </button>
  <div class="login modal-width few-forms">
    <h3 class="modal-title">体重Webにログイン</h3>
    <p class="form-message"></p>
    <form id="login-form"
      class="basic-info-form validate-form"
      novalidate>
      <div class="basic-info-form__contents">
        <div class="basic-info-form__box">
          <div class="basic-info-form__input validate-form__input">
            <label for="user_id"
              class="text-label">
              <div class="label-name">
                ID
              </div>
              <div class="label-input">
                <input type="text"
                  id="user_id"
                  name="user_id"
                  class="validate-target"
                  maxlength="10"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  data-numeric
                  autocomplete="user_id"
                  required>
              </div>
            </label>
          </div>
          <div class="validate-text"></div>
        </div>

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
                  pattern="[a-zA-Z0-9 !#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+"
                  inputmode="latin"
                  data-alphanumeric
                  required>
                <button type="button"
                  class="btn--pwd pwd-btn"
                  data-hidden="true">
                  <span class="material-symbols-outlined" data-icon="visibility">
                    visibility
                  </span>
                </button>
              </div>
            </label>
          </div>
          <div class="validate-text"></div>
        </div>
      </div>

      <div class="modal-buttons record-form__buttons">
        <div class="modal-buttons__group--columns">
          <button type="submit"
            class="btn btn--record submit-btn btn--w-100 disabled"
            id="btn--user-login"
            disabled><span class="btn__text">ログイン</span></button>
        </div>
      </div>
    </form>
  </div>
<?php
}
?>