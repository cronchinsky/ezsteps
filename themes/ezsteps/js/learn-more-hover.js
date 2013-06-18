/**
 * @file attaches a hover behavior to the 'learn more' text.
 */
(function ($) {
  Drupal.behaviors.learnMoreHover = {
    attach: function () {
      $('.ezsteps-learn-more-hover-target').hover(function () {
        $(this)
          .css('display','block')
          .find('.ezsteps-learn-more-hover-tip')
          .stop(false, true)
          .fadeIn();
      }, function () {
        $(this)
          .css('display','inline')
          .find('.ezsteps-learn-more-hover-tip')
          .stop(false, true)
          .fadeOut();
      });
    }
  };
})(jQuery);