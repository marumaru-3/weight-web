<?php

namespace view\welcome;

use lib\Msg;

function index($page_title)
{
  \partials\head($page_title);
?>

  <div id="layout">
    <main class="welcome">
      <?php Msg::flush(); ?>
      <h1 class="welcome__title">
        <img src="<?php echo BASE_IMAGE_PATH; ?>main-logo.svg"
          alt="体重Web ロゴ" />
        体重Web
      </h1>
      <p class="welcome__title-sub">毎日体重を記録して、<span class="in-bl">理想のあなたを目指しましょう！</span></p>
      <div class="welcome__weight-summary weight-summary">
        <div class="weight-summary__block card">
          <p class="weight-summary__title">現在のあなた</p>
          <p class="weight-summary__text">
            <span class="weight-summary__num">71.4</span>
            <span class="weight-summary__unit">kg</span>
          </p>
        </div>
        <div class="weight-summary__arrow">
          <img src="<?php echo BASE_IMAGE_PATH; ?>arrow-right.svg"
            alt="" />
        </div>
        <div class="weight-summary__block card">
          <p class="weight-summary__title">3ヶ月後のあなた</p>
          <p class="weight-summary__text">
            <span class="weight-summary__num">65.0</span>
            <span class="weight-summary__unit">kg</span>
          </p>
        </div>
      </div>
      <div class="welcome__btn-text">
        <p class="welcome__big-text">今すぐ始めましょう</p>
        <button class="welcome__btn btn btn--account"
          data-modal="register">
          <span class="btn__text">
            アカウントを作成
          </span>
        </button>
      </div>
      <div class="welcome__btn-text">
        <p class="welcome__text">アカウントをお持ちの場合</p>
        <button class="welcome__btn btn btn--login"
          data-modal="login">
          <span class="btn__text">
            ログイン
          </span>
        </button>
      </div>

    </main>
  </div>
<?php
}
?>