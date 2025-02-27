<div class="page home">
  <div class="home__reminder">
    <p class="home__text">
      ○○さん、あと4.1kgで目標達成！<span class="in-bl">焦らずに頑張ろう！</span>
    </p>
    <button class="modal-record__open btn btn--record">
      <span class="btn__text">今日の記録を追加する</span>
    </button>
  </div>
  <div class="weight-summary">
    <div class="weight-summary__block card weight-summary__block--main">
      <p class="weight-summary__title">今日の体重</p>
      <p class="weight-summary__text">
        <span class="weight-summary__num">68.1</span>
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
        <span class="weight-summary__num">64.0</span>
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
      <p class="weight-graph__date">2024/12/06～2025/01/07</p>
    </div>
    <a href="/weight-management/log"
       class="btn btn--more">
      <span class="btn__text">もっと見る</span>
      <span class="material-symbols-outlined"> chevron_right </span>
    </a>
    <div class="weight-graph__graph">
      <canvas id="graph"></canvas>
    </div>
  </div>
</div>

<?php $modal_c = __DIR__ . "/php/components/modal/record.php"; ?>
<?php print_r($modal_c); ?>
<?php modalContents($modal_c); ?>

<!-- <div id="modal"
     class="modal">
  <div class="modal__container">
    <div class="modal-record">
      <div class="modal-record__date">
        <button class="date-prev">
          <img src="./images/date-arrow.svg"
               alt="<" />
        </button>
        <p class="date__contents">2025/01/07</p>
        <button class="date-next">
          <img src="./images/date-arrow.svg"
               alt="<" />
        </button>
      </div>
      <form id="record-form"
            class="record-form">
        <div class="record-form__contents">
          <label for="weight">体重</label>
          <div class="record-form__input">
            <input type="number"
                   id="weight"
                   name="weight"
                   placeholder="例： 68.4"
                   step="0.1"
                   required> <span class="weight__unit">kg</span>
          </div>
        </div>
        <div class="record-form__contents">
          <label for="memo">一言メモ <span class="label-att">※30文字以内</span></label>
          <div class="record-form__input">
            <textarea id="memo"
                      name="memo"
                      rows="1"
                      placeholder="例: 今日はたくさん運動した。"></textarea>
          </div>
        </div>

        <div class="modal-buttons record-form__buttons">
          <div class="modal-buttons__group">
            <button type="button"
                    id="close-modal"
                    class="btn btn--cancel">キャンセル</button>
            <button type="submit"
                    class="btn btn--record"><span class="btn__text">記録を追加</span></button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div> -->