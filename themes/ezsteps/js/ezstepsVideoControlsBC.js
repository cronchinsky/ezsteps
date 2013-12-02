(function ($) {
  Drupal.behaviors.ezstepsVideoControls = {
    attach: function () {     
      $('#ezsteps-video-controls-brightcove').hide();
      $('.field-name-field-activity-video-hosted, .field-name-field-start-here-video-hosted').hover(function () {
        $(this).find('#ezsteps-video-controls-brightcove').fadeIn(100);
      }, function () {
        $(this).find('#ezsteps-video-controls-brightcove').fadeOut(100);
      });     

      $('#ezsteps-video-play-pause').click(function () {
          toggleVideo();
        });
    }
  };
})(jQuery);