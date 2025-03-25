<?php

namespace view\home;

function index($page_title, $user = null, $weight_logs = null)
{

  $today = date("Y-m-d");

  $today_logs = array_filter($weight_logs, function ($log) use ($today) {
    return $log->recorded_at === $today;
  });
  $today_weight = $today_logs[0]->weight ?? null;
  $today_memo = $today_logs[0]->memo ?? null;

  print_r($today_logs);
?>
  <div class="page home">
    <div class="home__reminder">
      <p class="home__text">
        <?php echo $user->username; ?>さん、あと4.1kgで目標達成！<span class="in-bl">焦らずに頑張ろう！</span>
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
          <span class="weight-summary__num"><?php echo $today_weight ?></span>
          <span class="weight-summary__unit">kg</span>
        </p>
      </div>
      <div class="weight-summary__block card">
        <p class="weight-summary__title">今日の体脂肪率(推定)</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num">24.1</span>
          <span class="weight-summary__unit">%</span>
        </p>
      </div>
      <div class="weight-summary__block card">
        <p class="weight-summary__title">あなたの理想体重</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"><?php echo number_format($user->ideal_weight, 1); ?></span>
          <span class="weight-summary__unit">kg</span>
        </p>
      </div>
    </div>
    <div class="today-memo card">
      <p class="today-memo__title">今日の一言メモ</p>
      <p class="today-memo__text">
        あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほ
      </p>
    </div>
    <div class="weight-graph card">
      <div class="weight-graph__meta">
        <h3 class="weight-graph__title contents-title">体重</h3>
        <p class="weight-graph__date"></p>
      </div>
      <a href="<?php the_url('/log'); ?>"
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