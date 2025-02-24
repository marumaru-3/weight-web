<div class="page log">
  <h2 class="page-title">体重ログ</h2>
  <div class="weight-graph card">
    <div class="weight-graph__header">
      <div class="weight-graph__meta">
        <h3 class="weight-graph__title">体重</h3>
        <p class="weight-graph__date">2024/12/06～2025/01/07</p>
      </div>
      <ul class="weight-graph__switch">
        <li class="weight-graph__item">
          <button class="btn btn--select">1週間</button>
        </li>
        <li class="weight-graph__item">
          <button class="btn">1ヶ月</button>
        </li>
        <li class="weight-graph__item">
          <button class="btn">3ヶ月</button>
        </li>
        <li class="weight-graph__item">
          <button class="btn">半年</button>
        </li>
        <li class="weight-graph__item">
          <button class="btn">1年</button>
        </li>
      </ul>
    </div>
    <div class="weight-graph__graph">
      <canvas id="graph"></canvas>
    </div>
  </div>
  <div class="weight-summary">
    <div
      class="weight-summary__block card">
      <p class="weight-summary__title">1ヶ月の平均体重</p>
      <p class="weight-summary__text">
        <span class="weight-summary__num">68.1</span>
        <span class="weight-summary__unit">kg</span>
      </p>
    </div>
    <div class="weight-summary__block card">
      <p class="weight-summary__title">1ヶ月の平均体脂肪率(推定)</p>
      <p class="weight-summary__text">
        <span class="weight-summary__num">24.1</span>
        <span class="weight-summary__unit">%</span>
      </p>
    </div>
    <div class="weight-summary__block card">
      <p class="weight-summary__title">1ヶ月の平均BMI</p>
      <p class="weight-summary__text">
        <span class="weight-summary__num">64.0</span>
        <span class="weight-summary__unit">kg</span>
      </p>
    </div>
    <div class="weight-summary__block card">
      <p class="weight-summary__title">前月比 (1ヶ月の平均体重)</p>
      <p class="weight-summary__text">
        <span class="weight-summary__num">64.0</span>
        <span class="weight-summary__unit">kg</span>
      </p>
    </div>
    <div class="weight-summary__block card">
      <p class="weight-summary__title">1ヶ月の最高体重</p>
      <p class="weight-summary__text">
        <span class="weight-summary__num">64.0</span>
        <span class="weight-summary__unit">kg</span>
      </p>
    </div>
    <div class="weight-summary__block card">
      <p class="weight-summary__title">1ヶ月の最低体重</p>
      <p class="weight-summary__text">
        <span class="weight-summary__num">64.0</span>
        <span class="weight-summary__unit">kg</span>
      </p>
    </div>
  </div>
  <div class="weight-days">
    <div class="weight-days__header">
      <h3 class="weight-days__title">日ごとの体重記録</h3>
      <ul class="weight-days__switch">
        <li class="weight-days__list">
          <button class="btn btn--select">新しい順</button>
        </li>
        <li class="weight-days__list">
          <button class="btn">古い順</button>
        </li>
      </ul>
    </div>
    <div class="weight-days__blocks">
      <?php for ($i = 0; $i < 6; $i++): ?>
        <div class="weight-days__block card">
          <p class="weight-days__date">2025/01/03</p>
          <button class="weight-days__admin">
            <span class="material-symbols-outlined">
              edit
            </span>
          </button>
          <div class="weight-days__item weight-days__item--weight">
            <p class="weight-days__label">体重</p>
            <p class="weight-days__value">
              <span class="weight-days__num">68.1</span>
              <span class="weight-days__unit">kg</span>
            </p>
          </div>
          <div class="weight-days__item">
            <p class="weight-days__label">体脂肪率(推定)</p>
            <p class="weight-days__value">
              <span class="weight-days__num">24.2</span>
              <span class="weight-days__unit">%</span>
            </p>
          </div>
          <div class="weight-days__item">
            <p class="weight-days__label">BMI</p>
            <p class="weight-days__value">
              <span class="weight-days__num">24.18</span>
            </p>
          </div>
          <div class="weight-days__item">
            <p class="weight-days__label">前日比</p>
            <p class="weight-days__value">
              <span class="weight-days__num">-0.6</span>
              <span class="weight-days__unit">kg</span>
            </p>
          </div>
          <div class="weight-days__item weight-days__item--memo">
            <p class="weight-days__label">一言メモ</p>
            <p class="weight-days__value">あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほ</p>
          </div>
        </div>
      <?php endfor; ?>
    </div>
    <button class="btn btn--more">
      もっと見る
      <span class="material-symbols-outlined">
        keyboard_arrow_down
      </span>
    </button>
  </div>
</div>