<?php

namespace config;

function notices()
{
  return [
    "notice02" => [
      'type' => 'info',
      'title' => 'アップデートのお知らせ【6/19 09:00公開】',
      'date' => '2025/06/19 09:00',
      'body' =>
      "<p>
        6/19 09:00にアップデートを行いました。<br>
        アップデート内容の詳細は下記のとおりです。<br>
        <br>
        <span class='indent'>・記録を追加モーダル及び記録を編集モーダルのUIを改善しました。</span>
        <span class='indent'>・モーダル表示速度を改善しました。</span>
      </p>"
    ],
    "notice01" => [
      'type' => 'info',
      'title' => '「体重Web」本番リリースのお知らせ',
      'date' => '2025/04/20 11:00',
      'body' =>
      "<p>
        このたび「体重Web」が正式に公開されました！<br>
        <br>
        引き続き、シンプルで使いやすい体重記録アプリとして改善を続けていきます。<br>
        今後ともよろしくお願いします！
      </p>"
    ],
  ];
}
