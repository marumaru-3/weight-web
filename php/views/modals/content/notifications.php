<?php

namespace view\modal\notifications;

function index()
{
  $notices = require_once __DIR__ . '/notices.php';
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
        <div class="notice-detail visible" id="notice01">
          <div class="notice-detail__header">
            <div class="notice-detail__flex">
              <div class="notice-contents__label notice-contents__label--info">インフォメーション</div>
              <p class="notice-contents__date">2025/04/12 11:00</p>
            </div>
            <p class="notice-contents__title">アップデートのお知らせ【4/12 11:00公開】</p>
          </div>
          <div class="notice-detail__body">
            <p>
              4/12 11:00にアップデートを行いました。<br>
              アップデート内容の詳細は下記のとおりです。
            </p>
            <ul>
              <li>今日の記録を追加モーダルの日付選択のとき、日付をクリックした際にカレンダーが表示できるようになりました。</li>
              <li>モーダル表示速度を改善しました。</li>
            </ul>
          </div>
        </div>
        <div class="notice-detail hidden" id="notice02">
          <div class="notice-detail__header">
            <div class="notice-detail__flex">
              <div class="notice-contents__label notice-contents__label--defect">不具合</div>
              <p class="notice-contents__date">2025/04/12 11:00</p>
            </div>
            <p class="notice-contents__title">アップデートのお知らせ【4/12 11:00公開】</p>
          </div>
          <div class="notice-detail__body">
            <p>
              4/12 11:00にアップデートを行いました。<br>
              アップデート内容の詳細は下記のとおりです。
            </p>
            <ul>
              <li>今日の記録を追加モーダルの日付選択のとき、日付をクリックした際にカレンダーが表示できるようになりました。</li>
              <li>モーダル表示速度を改善しました。</li>
            </ul>
          </div>
        </div>
        <div class="notice-detail hidden" id="notice03">
          <div class="notice-detail__header">
            <div class="notice-detail__flex">
              <div class="notice-contents__label notice-contents__label--info">インフォメーション</div>
              <p class="notice-contents__date">2025/04/22 11:00</p>
            </div>
            <p class="notice-contents__title">アップデートのお知らせ【4/22 11:00公開】</p>
          </div>
          <div class="notice-detail__body">
            <p>
              4/12 11:00にアップデートを行いました。<br>
              アップデート内容の詳細は下記のとおりです。
            </p>
            <ul>
              <li>今日の記録を追加モーダルの日付選択のとき、日付をクリックした際にカレンダーが表示できるようになりました。</li>
              <li>モーダル表示速度を改善しました。</li>
            </ul>
          </div>
        </div>
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