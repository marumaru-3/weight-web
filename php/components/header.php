<header id="header"
        class="layout__header">
  <div class="header__left">
    <h1 class="header__logo">
      <a href="/weight-management/home"
         title="体重Web">
        <img src="./images/main-logo.svg"
             alt="体重Web ロゴ" />
        体重Web
      </a>
    </h1>
  </div>
  <div id="header__info"
       class="header__info">
    <button id="header__profile"
            class="header__profile">
      <img src="./images/header-user.svg"
           alt="ユーザー" />
    </button>
    <span class="header__user-id">ID : 0000000000</span>

    <div id="user-popup"
         class="user-popup">
      <p class="user-popup__name">○○ さん</p>
      <div class="user-popup__copy copy-contents">
        <p class="copy__label">
          ID
          <span class="material-symbols-outlined">
            content_copy
          </span>
        </p>
        <p class="copy__value">0000000000</p>
      </div>
      <div class="user-popup__buttons">
        <a href="/weight-management/user"
           class="btn btn--user">
          <span class="btn__text">ユーザー情報</span>
        </a>
        <button type="submit"
                class="btn btn--logout"><span class="btn__text">ログアウト</span></button>
      </div>
    </div>
  </div>
</header>