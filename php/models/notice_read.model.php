<?php

namespace model;

class NoticeReadModel extends AbstractModel
{
  public int $id;
  public int $user_id;
  public ?string $last_read_at;

  protected static $SESSION_NAME = "_notice_read";
}
