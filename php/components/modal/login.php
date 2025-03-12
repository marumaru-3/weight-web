<div class="login modal-width">
  <h3 class="modal-title">体重Webにログイン</h3>
  <form id="basic-info-form"
    class="basic-info-form validate-form"
    novalidate>
    <div class="basic-info-form__contents">
      <div class="basic-info-form__box">
        <div class="basic-info-form__input validate-form__input">
          <label for="username"
            class="text-label">
            <div class="label-name">
              ID
            </div>
            <div class="label-input">
              <input type="text"
                id="username"
                class="validate-target"
                maxlength="10"
                required>
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