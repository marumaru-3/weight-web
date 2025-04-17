<?php

namespace view\help;

function index($page_title)
{
?>
  <div class="page help">
    <h2 class="page-title"><?php echo $page_title; ?></h2>
    <ul class="help-summary">
      <li class="help-summary__accordion accordion card"
        data-state="close">
        <button class="accordion-btn"
          type="button">
          基本的な使い方について
          <span class="material-symbols-outlined"
            data-icon="add_circle"></span>
        </button>
        <ul class="help-summary__ul accordion-content">
          <li>
            <p class="ul__list-title">ステップ1: 記録の追加方法</p>
            <ol class="ul__ol">
              <li>サイドバーの「記録を追加」、またはホームの「今日の記録を追加する」を押します。</li>
              <li>今日以外の記録を追加したい場合には、左右の矢印から記録したい日を選択します。</li>
              <li>体重と一言メモを入力して「記録を追加」を押します。<br>※すでに体重が記録されている場合、情報は上書きされます。</li>
            </ol>
          </li>
          <li>
            <p class="ul__list-title">ステップ2: 記録の編集・削除方法</p>
            <ol class="ul__ol">
              <li>ホームの「今日の体重」、または体重ログの「日ごとの体重記録」の右上にある編集ボタンを押します。</li>
              <li>「体重」「一言メモ」を押して記録を変更できます。また、「削除」を押して記録を削除できます。
              </li>
            </ol>
          </li>
          <li>
            <p class="ul__list-title">ステップ3: グラフの使い方</p>
            <ul class="ul__ul">
              <li>各計測日のポインタにカーソルを合わせると日付と体重が表示されます。</li>
              <li>体重ログのグラフでは、右上にある各ボタンから「1ヶ月」「3ヶ月」「半年」「1年」の表示に変更することができます。</li>
              <li>体重ログのグラフでは、PCでは最大31個、SPでは最大12個のポインタ（データ点）が表示されます。それ以上の日数を表示する場合は、近くの日の体重を平均してポインタに反映します。</li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="help-summary__accordion accordion card"
        data-state="close">
        <button class="accordion-btn"
          type="button">
          アカウント関連について
          <span class="material-symbols-outlined"
            data-icon="add_circle"></span>
        </button>
        <ul class="help-summary__ul accordion-content">
          <li>
            <p class="ul__list-title">IDの表示・管理について</p>
            <p class="ul__list-text">画面右上、またはユーザー情報のアカウント情報にIDの記載があります。IDはどこかに必ず保管するようにしてください。<br>
              IDはアカウントにログインするために必要な情報です。IDを忘れてしまった場合には、二度とアカウントにログイン出来なくなってしまいます。</p>
          </li>
          <li>
            <p class="ul__list-title">ログアウトやアカウントの削除方法</p>
            <ul class="ul__ul">
              <li>ログアウトは、ユーザー情報の下部にある「ログアウト」を押します。</li>
              <li>アカウントの削除は、設定のアカウント設定にある「アカウントの削除」を押します。<br>
                ※一度アカウントを削除するとすべての記録が削除され、元に戻せません。
              </li>
            </ul>
          </li>
          <li>
            <p class="ul__list-title">データの初期化方法</p>
            <p class="ul__list-text">設定のアカウント設定にある「データの初期化」を押します。<br>
              ※一度初期化するとすべての記録が削除され、元に戻せません。</p>
          </li>
        </ul>
      </li>
      <li class="help-summary__accordion accordion card"
        data-state="close">
        <button class="accordion-btn"
          type="button">
          プライバシーについて
          <span class="material-symbols-outlined"
            data-icon="add_circle"></span>
        </button>
        <ul class="help-summary__ul accordion-content">
          <li>
            <p class="ul__list-text">このWebアプリはログインIDや体重データ、生年月日を管理しますが、第三者と共有することはありません。<br>
              生年月日は、年齢に応じた体重管理の参考データとして利用します。<br>
              体重データはユーザー自身が削除できます。<br>
              また、アカウントを削除すると、生年月日を含むすべてのデータが完全に削除されます。</p>
          </li>
        </ul>
      </li>
      <li class="help-summary__accordion accordion card"
        data-state="close">
        <button class="accordion-btn"
          type="button">
          よくある質問（FAQ）
          <span class="material-symbols-outlined"
            data-icon="add_circle"></span>
        </button>
        <ul class="help-summary__ul accordion-content">
          <li>
            <p class="ul__list-question">体脂肪率(推定)とは何ですか？</p>
            <p class="ul__list-answer"><span>体重と身長をもとに算出される推定値です。体組成計を使った測定とは異なり、<br class="sp-none">
                一般的な計算式を用いた参考値となります。<br>
                ※ 計算式（例）<br>
                男性「BMI × 1.2 + 年齢 × 0.23 - 16.2」<br>
                女性「BMI × 1.2 + 年齢 × 0.23 - 5.4」<br>
                その他「BMI × 1.2 + 年齢 × 0.23 - 10.8」
              </span></p>
          </li>
          <li>
            <p class="ul__list-question">日付の指定は環境や端末によって変わりますか？</p>
            <p class="ul__list-answer">いいえ。どの環境であっても、日本時間に合わせた日付設定になります。</p>
          </li>
          <li>
            <p class="ul__list-question">スマホとパソコンで同じアカウントを使えますか？</p>
            <p class="ul__list-answer">はい。同じIDでログインすれば使用できます。</p>
          </li>
          <li>
            <p class="ul__list-question">データのバックアップは取れますか？</p>
            <p class="ul__list-answer">現在バックアップの機能は実装していません。</p>
          </li>
          <li>
            <p class="ul__list-question">データが正しく保存されない場合は？</p>
            <p class="ul__list-answer"><span>こちらのXアカウントのDMでご連絡ください。 <a href="https://x.com/yukipyy3007" target="_blank"
                  class="ul__link">https://x.com/yukipyy3007</a></span></p>
          </li>
        </ul>
      </li>
      <li class="help-summary__accordion accordion card"
        data-state="close">
        <button class="accordion-btn"
          type="button">
          お問い合わせ
          <span class="material-symbols-outlined"
            data-icon="add_circle"></span>
        </button>
        <ul class="help-summary__ul accordion-content">
          <li>
            <p class="ul__list-text">体重Webについて疑問点や改善点等ありましたら、<br>
              こちらのXアカウントのDMでご連絡ください。 <a href="https://x.com/yukipyy3007" target="_blank"
                class="ul__link">https://x.com/yukipyy3007</a></p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
<?php
}
?>