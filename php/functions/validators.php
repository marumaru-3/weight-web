<?php

namespace lib;

use lib\Msg;

/**
 * 数値入力のバリデーション
 * - 整数部 0〜3 桁
 * - 小数部 0〜1 桁（末尾ドットも許容）
 * - 最大 999.9 kg
 * 
 * @param string $raw ニューザー入力
 * @return array {bool, ?string} [OK?, エラーメッセージ]
 */
function validate_decimal(string $raw): array
{
  // 形式チェック：整数1～3桁、任意で「.」「.数字」
  if (!preg_match('/^[0-9]{1,3}(?:\.[0-9]?)?$/', $raw)) {
    return [false, '入力失敗： 値は整数3桁・小数1桁までで入力してください'];
  }

  $num = (float)$raw;
  if ($num < 0 || $num > 999.9) {
    return [false, '入力失敗： 値は0～999.9の範囲で入力してください'];
  }
  return [true, null];
}

/**
 * バリデーション用汎用レスポンス
 */
function json_validation_error(string $message, ?string $field = null): void
{
  Msg::push(Msg::ERROR, $message);
  echo json_encode([
    'success' => false,
    'message' => $message
  ]);
  exit;
}
