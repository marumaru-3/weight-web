<?php

namespace partials;

function footer()
{
    ?>
<span class="material-symbols-outlined must-hidden"
      data-icon="content_copy"></span>
<script src="<?php echo BASE_CONTEXT_PATH; ?>api/config.js.php"></script>
<script type="module"
        src="<?php echo BASE_ASSETS_PATH; ?>main.js"></script>
</body>

</html>
<?php
}
?>
