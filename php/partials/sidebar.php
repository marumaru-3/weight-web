<?php

namespace partials;

function sidebar($page)
{
    ?>
  <aside class="layout__sidebar">
    <button id="menu-toggle"
      class="btn sidebar__menu-toggle">
      <span class="material-symbols-outlined"
        data-icon="menu_open"></span>
    </button>
    <button class="btn btn--record"
      data-modal="record">
      <span class="material-symbols-outlined"
        data-icon="edit_square"></span>
      <span class="btn__text">記録を追加</span>
    </button>
    <nav class="sidebar__nav">
      <ul class="sidebar__list">
        <li class="sidebar__item">
          <a href="<?php the_url("/home"); ?>"
            class="sidebar__link <?php echo $page === "home"
                ? "sidebar__link--active"
                : ""; ?>">
            <span class="link__inner btn btn--nav">
              <span class="material-symbols-outlined"
                data-icon="home"></span>
              <span class="btn__text">ホーム</span>
            </span>
          </a>
        </li>
        <li class="sidebar__item">
          <a href="<?php the_url("/logs"); ?>"
            class="sidebar__link <?php echo $page === "logs"
                ? "sidebar__link--active"
                : ""; ?>">
            <span class="link__inner btn btn--nav">
              <span class="material-symbols-outlined"
                data-icon="accessibility_new"></span>
              <span class="btn__text">体重ログ</span>
            </span>
          </a>
        </li>
        <li class="sidebar__item">
          <a href="<?php the_url("/user"); ?>"
            class="sidebar__link <?php echo $page === "user"
                ? "sidebar__link--active"
                : ""; ?>">
            <span class="link__inner btn btn--nav">
              <span class="material-symbols-outlined"
                data-icon="account_circle"></span>
              <span class="btn__text sp-none">ユーザー情報</span>
              <span class="btn__text sp-only">ユーザー</span>
            </span>
          </a>
        </li>
        <li class="sidebar__item">
          <a href="<?php the_url("/help"); ?>"
            class="sidebar__link <?php echo $page === "help"
                ? "sidebar__link--active"
                : ""; ?>">
            <span class="link__inner btn btn--nav">
              <span class="material-symbols-outlined"
                data-icon="help"></span>
              <span class="btn__text">ヘルプ</span>
            </span>
          </a>
        </li>
        <li class="sidebar__item">
          <a href="<?php the_url("/settings"); ?>"
            class="sidebar__link <?php echo $page === "settings"
                ? "sidebar__link--active"
                : ""; ?>">
            <span class="link__inner btn btn--nav">
              <span class="material-symbols-outlined"
                data-icon="settings"></span>
              <span class="btn__text">設定</span>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
<?php
}
?>
