<?php

namespace view\modal\accountCreated;

function index($user)
{
?>

  <div class="account-create modal-width">
    <h3 class="modal-title">アカウントを作成しました！</h3>
    <p class="modal-text">次回ログイン時には以下のIDをご使用ください。</p>
    <div class="modal-id copy-contents">
      <p class="modal-id__label copy-link">
        ID
        <span class="material-symbols-outlined"
          data-icon="content_copy"></span>
      </p>
      <p class="modal-id__value copy__value"><?php echo $user->id; ?></p>
    </div>
    <div class="modal-att">
      <p class="modal-att__label">注意！</p>
      <p class="modal-att__text">IDを忘れてしまった場合には、二度とアカウントにログイン出来なくなってしまうため、必ずどこかにIDを保管するようにしてください。</p>
    </div>
    <div class="basic-info-form validate-form">
      <div class="basic-info-form__contents">
        <div class="basic-info-form__checkbox">
          <input type="checkbox"
            id="password-check"
            name="password-check"
            required>
          <label for="password-check"
            class="checkbox-label">
            IDについて理解しました。
          </label>
        </div>
      </div>

      <div class="modal-buttons record-form__buttons">
        <div class="modal-buttons__group--columns">
          <button type="submit"
            class="close-modal btn btn--record submit-btn btn--w-100 disabled"
            disabled><span class="btn__text">体重管理を始める</span></button>
        </div>
      </div>
    </div>
  </div>
<?php
}
?>