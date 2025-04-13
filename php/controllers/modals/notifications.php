<?php

namespace controller\modal\notifications;

function get()
{
  header("Content-Type: text/html");

  \view\modal\modal\modalContents("notifications");
}
