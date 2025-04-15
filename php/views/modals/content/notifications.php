<?php

namespace view\modal\notifications;

use function config\notices;

function index()
{
  $notices = notices();
?>
  <button type="button"
    class="close-modal close-logo">
    <span class="material-symbols-outlined"
      data-icon="add_circle"></span>
  </button>
  <div class="account-create modal-width">
    <h3 class="modal-title">お知らせ</h3>
    <div id="step1"
      class="step visible">
      <div class="notice-wrapper">
        <?php foreach ($notices as $key => $notice) : ?>
          <div class="notice-contents card btn--go-to-step2" data-notice="<?php echo $key; ?>">
            <?php if ($notice['type'] === 'info') : ?>
              <div class="notice-contents__label notice-contents__label--info">インフォメーション</div>
            <?php elseif ($notice['type'] === 'defect') : ?>
              <div class="notice-contents__label notice-contents__label--defect">不具合</div>
            <?php endif; ?>
            <p class="notice-contents__title"><?php echo $notice['title']; ?></p>
            <p class="notice-contents__date"><?php echo $notice['date']; ?></p>
          </div>
        <?php endforeach; ?>
      </div>
      <div class="basic-info-form validate-form">
        <div class="modal-buttons record-form__buttons">
          <div class="modal-buttons__group--columns">
            <button type="submit"
              class="close-modal btn btn--record submit-btn btn--w-100 "><span class="btn__text">閉じる</span></button>
          </div>
        </div>
      </div>
    </div>
    <div id="step2"
      class="step hidden">
      <div class="notice-wrapper">
        <?php foreach ($notices as $key => $notice) : ?>
          <div class="notice-detail" id="<?php echo $key; ?>">
            <div class="notice-detail__header">
              <div class="notice-detail__flex">
                <?php if ($notice['type'] === 'info') : ?>
                  <div class="notice-contents__label notice-contents__label--info">インフォメーション</div>
                <?php elseif ($notice['type'] === 'defect') : ?>
                  <div class="notice-contents__label notice-contents__label--defect">不具合</div>
                <?php endif; ?>
                <p class="notice-contents__date"><?php echo $notice['date']; ?></p>
              </div>
              <p class="notice-contents__title"><?php echo $notice['title']; ?></p>
            </div>
            <div class="notice-detail__body">
              <?php echo $notice['body']; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
      <div class="basic-info-form validate-form">
        <div class="modal-buttons record-form__buttons">
          <div class="modal-buttons__group--columns">
            <button type="button"
              class="btn btn--record submit-btn btn--w-100" id="btn--back-to-step1"><span class="btn__text">戻る</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
<?php
}
?>