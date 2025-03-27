<?php

namespace view\home;

use lib\weightDaysCalc;
use service\WeightLogService;

function index($page_title, $user = null, $weight_logs = null)
{
  $todayStats = WeightLogService::getTodayStats($user, $weight_logs);

  function summaryNum($today_value)
  {
    echo !empty($today_value) ? $today_value : '--';
  }
?>
  <div class="page home">
    <div class="home__reminder">
      <p class="home__text">
        <?php echo $user->username; ?> さん、あと
        <?php echo $todayStats["idealDefferWeight"]; ?>
        kgで目標達成！<span class="in-bl">焦らずに頑張ろう！</span>
      </p>
      <button class="btn btn--record"
        data-modal="record">
        <span class="btn__text">今日の記録を追加する</span>
      </button>
    </div>
    <div class="weight-summary">
      <div class="weight-summary__block card weight-summary__block--main">
        <button class="weight-summary__admin"
          data-modal="recordAdmin">
          <span class="material-symbols-outlined">
            edit
          </span>
        </button>
        <p class="weight-summary__title">今日の体重</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num">
            <?php summaryNum($todayStats["weight"]); ?>
          </span>
          <span class="weight-summary__unit">kg</span>
        </p>
      </div>
      <div class="weight-summary__block card">
        <p class="weight-summary__title">今日の体脂肪率(推定)</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num">
            <?php summaryNum($todayStats["bfp"]); ?>
          </span>
          <span class="weight-summary__unit">%</span>
        </p>
      </div>
      <div class="weight-summary__block card">
        <p class="weight-summary__title">あなたの理想体重</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num">
            <?php echo number_format($user->ideal_weight, 1); ?>
          </span>
          <span class="weight-summary__unit">kg</span>
        </p>
      </div>
    </div>
    <?php if (!empty($todayStats["memo"])): ?>
      <div class="today-memo card">
        <p class="today-memo__title">今日の一言メモ</p>
        <p class="today-memo__text">
          <?php echo $todayStats["memo"]; ?>
        </p>
      </div>
    <?php endif; ?>
    <div class="weight-graph card">
      <div class="weight-graph__meta">
        <h3 class="weight-graph__title contents-title">体重</h3>
        <p class="weight-graph__date"></p>
      </div>
      <a href="<?php the_url("/log"); ?>"
        class="btn btn--more">
        <span class="btn__text">もっと見る</span>
        <span class="material-symbols-outlined"> chevron_right </span>
      </a>
      <div class="weight-graph__graph">
        <canvas id="graph"></canvas>
      </div>
    </div>
  </div>
<?php
}
?>