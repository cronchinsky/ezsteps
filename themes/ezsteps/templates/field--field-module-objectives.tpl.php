<span class="ezsteps-learn-more-hover-target">
  <?php print t('Learn More'); ?>
  <div class="ezsteps-learn-more-hover-tip" style="display:none;">
    <div class="ezsteps-learn-more-hover-tip-top"></div>
    <div class="ezsteps-learn-more-hover-tip-middle">
      <span class="ezsteps-learn-more-learn-how-to">Learn How To:</span>
      <?php foreach ($items as $delta => $item): ?>
        <div class="ezsteps-learn-move-hover-item"> -<?php print render($item); ?></div>
      <?php endforeach; ?>
    </div>
    <div class="ezsteps-learn-more-hover-tip-bottom"></div>
  </div>
</span>