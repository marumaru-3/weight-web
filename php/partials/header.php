<?php

namespace partials;

function header($user)
{
?>
  <header id="header"
    class="layout__header">
    <div class="header__left">
      <h1 class="header__logo">
        <a href="<?php the_url("/home"); ?>"
          title="体重Web">
          <img src="<?php echo BASE_IMAGE_PATH; ?>header/main-logo.svg"
            alt="体重Web ロゴ" />
          体重Web
        </a>
      </h1>
    </div>
    <div id="header__info"
      class="header__info">
      <button id="header__profile"
        class="header__profile">
        <img src="<?php echo BASE_IMAGE_PATH; ?>header/header-user.svg"
          alt="ユーザー" />
      </button>
      <span class="header__user-id">ID : <?php echo $user->id; ?></span>

      <div id="user-popup"
        class="user-popup">
        <p class="user-popup__name"><?php echo $user->username; ?> さん</p>
        <div class="user-popup__copy copy-contents">
          <p class="copy__label copy-link">
            ID
            <span class="material-symbols-outlined" data-icon="content_copy">
              content_copy
            </span>
          </p>
          <p class="copy__value"><?php echo $user->id; ?></p>
        </div>
        <div class="user-popup__buttons">
          <a href="/weight-management/user"
            class="btn btn--user">
            <span class="btn__text">ユーザー情報</span>
          </a>
          <a href="<?php the_url("/logout"); ?>"
            class="btn btn--logout"><span class="btn__text">ログアウト</span></a>
        </div>
      </div>
    </div>
  </header>
<?php
}
?>