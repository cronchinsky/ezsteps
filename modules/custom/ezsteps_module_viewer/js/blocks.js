(function ($) {
  Drupal.behaviors.ezstepsBlocks = {
    attach: function () {
     $('.field-name-field-activity-mobile').hide();
     var closeLink = $('<a href="#" id="ezsteps-mobile-close"> Close </a>');
     $('.field-name-field-activity-mobile p').append(closeLink);
     $('.block-ezsteps-module-viewer-mobile h2').click(function () {
        $('.field-name-field-activity-mobile').show();
     });
     $('#ezsteps-mobile-close').click(function () {
        $('.field-name-field-activity-mobile').hide();
     });
    }
  };
})(jQuery);