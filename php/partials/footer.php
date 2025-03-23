<?php

namespace partials;

function footer()
{
?>
  <script>
    const BASE_PATH = "<?php echo BASE_CONTEXT_PATH; ?>"

    let showIdModal = <?php echo $_SESSION["show_id_modal"] ? 'true' : 'false'; ?>;
  </script>
  <script src="<?php echo BASE_JS_PATH; ?>helper.js"></script>
  <script type="module"
    src="<?php echo BASE_JS_PATH; ?>main.js"></script>
  </body>

  </html>
<?php
}
?>