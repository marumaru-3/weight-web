<button type="button"
        id="close-modal"
        class="close-logo">
  <span class="material-symbols-outlined">
    add_circle
  </span>
</button>
<div class="login modal-width">
  <h3 class="modal-title">体重Webにログイン</h3>
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
              <input type="number"
                     id="user_id"
                     name="user_id"
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