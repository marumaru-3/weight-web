<?php

namespace partials;

function footer()
{
    ?>
  <script src="<?php echo BASE_CONTEXT_PATH; ?>php/api/config.js.php"></script>
  <script src="<?php echo BASE_JS_PATH; ?>helper.js"></script>
  <script type="module"
    src="<?php echo BASE_JS_PATH; ?>main.js"></script>
  </body>

  </html>
<?php
}
?>
