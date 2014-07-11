<div id="ezsteps-module-viewer" class="<?php print $module_class ?>">
  <div id="ezsteps-module-viewer-top-spacer"></div>
  <h2 id="ezsteps-module-viewer-controls-title">Module <?php print $module_number; ?>: <?php print $title; ?></h2>
  <div class="ezsteps-viewer-navigation ezsteps-viewer-navigation-<?php print sizeof($link_classes); ?>-steps">
    <span id="ezsteps-nav-line">
      <?php foreach ($titles as $step => $title): ?>
        <span class="<?php print $link_classes[$step]; ?>">
          <a class="ezsteps-nav-circle-link" href="/module/<?php print $module_number; ?>/<?php print $step; ?>"> </a><br />
          <div class="ezsteps-nav-text-wrapper">
            <a class="ezsteps-nav-text-link" href="/module/<?php print $module_number; ?>/<?php print $step; ?>"><?php print $title; ?></a>
          </div>
        </span>
      <?php endforeach; ?>
    </span>
  </div>
  
  <div id="ezsteps-viewer-activity">
    <?php print $content; ?>
  </div>
</div>
