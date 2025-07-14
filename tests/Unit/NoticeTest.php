<?php

use PHPUnit\Framework\TestCase;
use function lib\hasUnreadNotice;   // 本番関数
use config\TestFixtures;            // notice フィクスチャ
use db\NoticeReadQuery as MockNoticeReadQuery; // わかりづらいためもモックを強調

final class NoticeTest extends TestCase
{
  /** 各テスト後にモックをリセット */
  protected function tearDown(): void
  {
    TestFixtures::$notices = [];
    MockNoticeReadQuery::$row = null;
  }

  /** ① 初回ログイン（既読レコードなし）→ 未読あり */
  public function testFirstLoginIsUnread(): void
  {
    TestFixtures::$notices = [
      'n1' => ['date' => '2025/07/14 00:00']
    ];
    MockNoticeReadQuery::$row = null;       // ← 既読なし

    $this->assertTrue(hasUnreadNotice(1));
  }

  /** ② 未読あり → true */
  public function testUnreadNoticeExists(): void
  {
    TestFixtures::$notices = [
      'n2' => ['date' => '2025/07/14 00:00']
    ];
    MockNoticeReadQuery::$row = (object)['last_read_at' => '2025/07/12 00:00'];

    $this->assertTrue(hasUnreadNotice(99));
  }

  /** ③ すべて既読 → false */
  public function testAllRead(): void
  {
    TestFixtures::$notices = [
      'n3' => ['date' => '2025/07/12 00:00']
    ];
    MockNoticeReadQuery::$row = (object)['last_read_at' => '2025/07/14 00:00'];

    $this->assertFalse(hasUnreadNotice(123456));
  }

  /** ④ お知らせゼロ → false（仕様：未読なしと判定） */
  public function testNoNoticeReturnFalse(): void
  {
    TestFixtures::$notices = [];
    MockNoticeReadQuery::$row = null;

    $this->assertFalse(hasUnreadNotice(42));
  }
}
