<aside class="layout__sidebar">
  <button id="menu-toggle"
    class="btn sidebar__menu-toggle">
    <span class="material-symbols-outlined"> menu_open </span>
  </button>
  <button class="btn btn--record">
    <span class="material-symbols-outlined"> edit_square </span>
    <span class="btn__text">記録を追加</span>
  </button>
  <nav class="sidebar__nav">
    <ul class="sidebar__list">
      <li class="sidebar__item">
        <a href="/weight-management/home"
          class="sidebar__link btn btn--nav <?php echo $page === 'home' ? 'sidebar__link--active' : ''; ?>">
          <span class="material-symbols-outlined"> home </span>
          <span class="btn__text">ホーム</span>
        </a>
      </li>
      <li class="sidebar__item">
        <a href="/weight-management/log"
          class="sidebar__link btn btn--nav <?php echo $page === 'log' ? 'sidebar__link--active' : ''; ?>">
          <span class="material-symbols-outlined">
            accessibility_new
          </span>
          <span class="btn__text">体重ログ</span>
        </a>
      </li>
      <li class="sidebar__item">
        <a href="/weight-management/user"
          class="sidebar__link btn btn--nav <?php echo $page === 'user' ? 'sidebar__link--active' : ''; ?>">
          <span class="material-symbols-outlined"> account_circle </span>
          <span class="btn__text sp-none">ユーザー情報</span>
          <span class="btn__text sp-only">ユーザー</span>
        </a>
      </li>
      <li class="sidebar__item">
        <a href="/weight-management/help"
          class="sidebar__link btn btn--nav <?php echo $page === 'help' ? 'sidebar__link--active' : ''; ?>">
          <span class="material-symbols-outlined"> help </span>
          <span class="btn__text">ヘルプ</span>
        </a>
      </li>
      <li class="sidebar__item">
        <a href="/weight-management/settings"
          class="sidebar__link btn btn--nav <?php echo $page === 'settings' ? 'sidebar__link--active' : ''; ?>">
          <span class="material-symbols-outlined"> settings </span>
          <span class="btn__text">設定</span>
        </a>
      </li>
    </ul>
  </nav>
</aside>