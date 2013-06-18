<div class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <div class="ezsteps-steps-inner">
    <div class="ezsteps-try-tab-steps-header">
      <?php echo t('FOLLOW THESE STEPS'); ?>
    </div>
    <?php if (!$label_hidden): ?>
      <div class="field-label"<?php print $title_attributes; ?>><?php print $label ?>:&nbsp;</div>
    <?php endif; ?>
    <ol class="field-items"<?php print $content_attributes; ?>>
      <?php foreach ($items as $delta => $item): ?>
        <li class="field-item <?php print $delta % 2 ? 'odd' : 'even'; ?>"<?php print $item_attributes[$delta]; ?>><?php print render($item); ?></li>
      <?php endforeach; ?>
    </ol>
  </div>
</div>
