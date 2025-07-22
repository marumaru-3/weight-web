<?php

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;

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

  #[DataProvider('hasUnreadCases')]
  public function testHasUnreadNotice(array $notices, ?string $lastReadAt, bool $expected): void
  {
    // フィクスチャ設定
    TestFixtures::$notices = $notices;
    MockNoticeReadQuery::$row = $lastReadAt
      ? (object)['last_read_at' => $lastReadAt]
      : null;

    // ユーザーIDはモック内で使われないので任意
    $this->assertSame($expected, hasUnreadNotice(1));
  }

  public static function hasUnreadCases(): array
  {
    return [
      'first login (no read record)' => [
        ['n1' => ['date' => '2025/07/14 00:00']],
        null,
        true
      ],
      'unread exists' => [
        ['n2' => ['date' => '2025/07/14 00:00']],
        '2025/07/12 00:00',
        true
      ],
      'all read' => [
        ['n3' => ['date' => '2025/07/12 00:00']],
        '2025/07/14 00:00',
        false
      ],
      'no notices' => [
        [],
        null,
        false
      ],
    ];
  }
}
