<?php

namespace lib;

use lib\Msg;

/**
 * パスワードバリデーション
 * - 4～30文字
 * 
 * @param string $raw ユーザー入力
 * @return array {bool, ?string} [OK?, エラーメッセージ]
 */
function validate_password(string $raw): array
{
  $pwd = $raw;

  // 空チェック
  if ($pwd === '') {
    return [false, 'パスワードを入力してください'];
  }

  // 半角英数字・記号のみチェック
  if (!preg_match('/^[\x20-\x7E]+$/', $pwd)) {
    return [false, '使用できない文字が含まれています（半角英数・記号のみ）'];
  }

  // 文字数チェック
  $len = strlen($pwd);
  if ($len < 4) {
    return [false, 'パスワードは4文字以上で入力してください'];
  }
  if ($len > 30) {
    return [false, 'パスワードは30文字以内で入力してください'];
  }

  return [true, null];
}

/**
 * 数値入力のバリデーション
 * - 整数部 0〜3 桁
 * - 小数部 0〜1 桁（末尾ドットも許容）
 * - 最大 999.9 kg
 * 
 * @param string $raw ユーザー入力
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
function json_validation_error(string $message): void
{
  Msg::push(Msg::ERROR, $message);
  echo json_encode([
    'success' => false,
    'errorMessage' => $message
  ]);
  exit;
}
