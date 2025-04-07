<?php

namespace view\user;

function index($page_title, $user)
{
?>
  <div class="page user">
    <h2 class="page-title"><?php echo $page_title; ?></h2>
    <div class="info-summary">
      <div class="info-summary__block card">
        <h3 class="info-summary__title contents-title">アカウント情報</h3>
        <button class="info-summary__admin"
          data-modal="adminAccount">
          <span class="material-symbols-outlined" data-icon="edit"></span>
          <span class="admin-text">編集</span>
        </button>
        <div class="info-summary__item copy copy-contents">
          <p class="info-summary__label copy-link">
            ID
            <span class="material-symbols-outlined" data-icon="content_copy"></span>
          </p>
          <p class="info-summary__value copy__value">
            <?php echo $user->id; ?>
          </p>
        </div>
        <div class="info-summary__item">
          <p class="info-summary__label">パスワード</p>
          <p class="info-summary__value">
            ••••••••••••••
          </p>
        </div>
        <div class="info-summary__item">
          <p class="info-summary__label">登録日</p>
          <p class="info-summary__value">
            <?php echo $user->getDate($user->created_at, true); ?>
          </p>
        </div>
        <div class="info-summary__item">
          <p class="info-summary__label">最終ログイン日</p>
          <p class="info-summary__value">
            <?php echo $user->getDate($user->last_login_at, true); ?>
          </p>
        </div>
      </div>
      <div class="info-summary__block card">
        <h3 class="info-summary__title contents-title">基本情報</h3>
        <button class="info-summary__admin"
          data-modal="adminUser">
          <span class="material-symbols-outlined" data-icon="edit"></span>
          <span class="admin-text">編集</span>
        </button>
        <div class="info-summary__item">
          <p class="info-summary__label">ユーザー名</p>
          <p class="info-summary__value"><?php echo $user->username; ?></p>
        </div>
        <div class="info-summary__item">
          <p class="info-summary__label">生年月日</p>
          <p class="info-summary__value">
            <?php echo $user->getDate($user->birthdate, true); ?>
          </p>
        </div>
        <div class="info-summary__item">
          <p class="info-summary__label">性別</p>
          <p class="info-summary__value">
            <?php echo $user->getGender($user->gender); ?>
          </p>
        </div>
        <div class="info-summary__item">
          <p class="info-summary__label">身長</p>
          <p class="info-summary__value">
            <?php echo $user->getFloat($user->height); ?> cm
          </p>
        </div>
        <div class="info-summary__item">
          <p class="info-summary__label">理想体重</p>
          <p class="info-summary__value">
            <?php echo $user->getFloat($user->ideal_weight); ?> kg
          </p>
        </div>
      </div>
    </div>
    <div class="user-btns">
      <a href="<?php the_url("/logout"); ?>"
        class="btn btn--att-color-03">
        <span class="btn__text">ログアウト</span>
      </a>
    </div>
  </div>
<?php
}
?>