<?php \partials\head("404", ""); ?>
<div id="layout">
  <main class="not404">
    <div class="header__logo">
      <a title="体重Web">
        <img src="/images/header/main-logo.svg" alt="体重Web ロゴ">
        体重Web
      </a>
    </div>
    <div class="not404__contents">
      <h1 class="not404__h1">404 Not Found</h1>
      <p class="not404__h1-sub">ご指定のページが見つかりませんでした。</p>
      <div class="not404__btn">
        <a href="<?php the_url("/home"); ?>"
          class="btn btn--more">
          <span class="btn__text">トップページはこちら</span>
          <span class="material-symbols-outlined"
            data-icon="chevron_right"></span>
        </a>
      </div>
    </div>
  </main>
</div>