<?php

namespace view\logs;

function index($page_title, $user, $weight_logs = null)
{
?>
  <div class="page logs">
    <h2 class="page-title"><?php echo $page_title; ?></h2>
    <div class="weight-graph card">
      <div class="weight-graph__meta">
        <h3 class="weight-graph__title contents-title">体重</h3>
        <p class="weight-graph__date"></p>
      </div>
      <ul class="weight-graph__switch">
        <li class="weight-graph__item">
          <button id="weight-graph__week"
            class="btn">1週間</button>
        </li>
        <li class="weight-graph__item">
          <button id="weight-graph__month"
            class="btn btn--select">1ヶ月</button>
        </li>
        <li class="weight-graph__item">
          <button id="weight-graph__three-month"
            class="btn">3ヶ月</button>
        </li>
        <li class="weight-graph__item">
          <button id="weight-graph__half-year"
            class="btn">半年</button>
        </li>
        <li class="weight-graph__item">
          <button id="weight-graph__year"
            class="btn">1年</button>
        </li>
      </ul>
      <div class="weight-graph__graph">
        <canvas id="graph"
          class="weight-graph__canvas"></canvas>
      </div>
    </div>
    <div class="weight-summary">
      <div class="weight-summary__block card"
        data-summary="average">
        <p class="weight-summary__title"><span class="period">1ヶ月</span>の平均体重</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"></span>
          <span class="weight-summary__unit">kg</span>
        </p>
      </div>
      <div class="weight-summary__block card"
        data-summary="bfp">
        <p class="weight-summary__title"><span class="period">1ヶ月</span>の平均体脂肪率<span class="in-bl">(推定)</span></p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"></span>
          <span class="weight-summary__unit">%</span>
        </p>
      </div>
      <div class="weight-summary__block card"
        data-summary="bmi">
        <p class="weight-summary__title"><span class="period">1ヶ月</span>の平均BMI</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"></span>
        </p>
      </div>
      <div class="weight-summary__block card"
        data-summary="in_de">
        <p class="weight-summary__title"><span class="period">1ヶ月</span>前平均と比較</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"></span>
          <span class="weight-summary__unit">kg</span>
        </p>
      </div>
      <div class="weight-summary__block card"
        data-summary="best">
        <p class="weight-summary__title"><span class="period">1ヶ月</span>の最高体重</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"></span>
          <span class="weight-summary__unit">kg</span>
        </p>
      </div>
      <div class="weight-summary__block card"
        data-summary="lowest">
        <p class="weight-summary__title"><span class="period">1ヶ月</span>の最低体重</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"></span>
          <span class="weight-summary__unit">kg</span>
        </p>
      </div>
    </div>
    <?php if (!($weight_logs === null)): ?>
      <div class="weight-days">
        <div class="weight-days__header">
          <h3 class="weight-days__title contents-title">日ごとの体重記録</h3>
          <ul class="weight-days__switch">
            <li class="weight-days__item">
              <button class="btn btn--select">新しい順</button>
            </li>
            <li class="weight-days__item">
              <button class="btn">古い順</button>
            </li>
          </ul>
        </div>
        <div class="weight-days__blocks">
          <?php foreach ($weight_logs as $key => $weight_log) {
            \partials\weight_days_block(
              $user,
              $weight_log,
              $key,
              $weight_logs
            );
          } ?>
        </div>
        <button class="btn btn--more">
          もっと見る
          <span class="material-symbols-outlined" data-icon="keyboard_arrow_down">
            keyboard_arrow_down
          </span>
        </button>
      </div>
    <?php endif; ?>
  </div>
<?php
}
?>