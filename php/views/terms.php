<?php

namespace view\terms;

use lib\Msg;

function index($page_title, $page_desc)
{
  \partials\head($page_title, $page_desc); ?>

  <div id="layout">
    <main class="terms">
      <div class="header__logo">
        <a title="体重Web">
          <img src="/images/header/main-logo.svg" alt="体重Web ロゴ">
          体重Web
        </a>
      </div>
      <div class="terms__contents">
        <h1 class="terms__title">
          体重Web 利用規約
        </h1>
        <p class="terms__first-text">
          この利用規約（以下、「本規約」といいます。）は、体重管理Webアプリ「体重Web」（以下、「本サービス」といいます。）の利用に関する条件を定めるものです。利用者（以下、「ユーザー」といいます。）は、本サービスを利用することで本規約に同意したものとみなします。
        </p>
        <ul class="terms-ul">
          <li class="terms-list">
            <h2 class="terms-list__title"><span class="in-bl">第1条</span><span class="in-bl">（サービスの内容）</span></h2>
            <p class="terms-list__text">本サービスは、ユーザーが体重や身長、生年月日、性別などの情報を登録し、BMIや推定体脂肪率の確認、目標体重まで日々の進捗管理ができるWebアプリです。</p>
          </li>
          <li class="terms-list">
            <h2 class="terms-list__title"><span class="in-bl">第2条</span><span class="in-bl">（登録情報とプライバシー）</span></h2>
            <p class="terms-list__text">ユーザーは、10桁の数字IDおよびパスワード、生年月日・性別・身長などの情報を入力することでアカウントを作成できます。<br>
              本サービスでは氏名・メールアドレス等の特定個人を識別する情報は取得していません。登録された情報は、健康管理や体重変化の分析を目的としてのみ使用されます。
            </p>
          </li>
          <li class="terms-list">
            <h2 class="terms-list__title"><span class="in-bl">第3条</span><span class="in-bl">（アクセス解析ツールの使用）</span></h2>
            <p class="terms-list__text">本サービスでは、サービスの改善を目的として Google Tag Manager を使用し、Google Analytics（GA4）によるアクセス解析を行っています。<br>
              これにより、Cookieを通じて匿名の利用データを収集しています。個人を特定する情報は含まれておらず、ユーザーはブラウザ設定によりCookieを無効にすることも可能です。
            </p>
          </li>
          <li class="terms-list">
            <h2 class="terms-list__title"><span class="in-bl">第4条</span><span class="in-bl">（禁止事項）</span></h2>
            <p class="terms-list__text">
              以下の行為は禁止とします：
            </p>
            <ul class="terms-list__ul">
              <li>
                － 本サービスの内容や構成を無断で複製・再配布・再公開する行為
              </li>
              <li>
                － 他人になりすます行為
              </li>
              <li>
                － 本サービスの運営を妨げる行為
              </li>
              <li>
                － その他、法令または公序良俗に反する行為
              </li>
            </ul>
          </li>
          <li class="terms-list">
            <h2 class="terms-list__title"><span class="in-bl">第5条</span><span class="in-bl">（免責事項）</span></h2>
            <p class="terms-list__text">本サービスは、できる限り正確な情報の提供に努めていますが、内容の正確性や完全性を保証するものではありません。<br>
              本サービスの利用または利用できなかったことにより発生した損害について、当方は一切の責任を負いません。</p>
          </li>
          <li class="terms-list">
            <h2 class="terms-list__title"><span class="in-bl">第6条</span><span class="in-bl">（規約の変更）</span></h2>
            <p class="terms-list__text">本規約は、必要に応じて予告なく変更されることがあります。変更後の利用規約は、本サービス上に掲載された時点で効力を生じます。</p>
          </li>
          <li class="terms-list">
            <h2 class="terms-list__title"><span class="in-bl">第7条</span><span class="in-bl">（準拠法および管轄）</span></h2>
            <p class="terms-list__text">本規約は日本法に準拠し、本サービスに関連して生じた紛争は、運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。</p>
          </li>
        </ul>
        <p class="terms__enactment">制定日：2025年4月19日</p>
    </main>
  </div>
<?php
}
?>