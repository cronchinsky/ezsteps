(function ($) {
  Drupal.behaviors.ezstepsTabOpen = {
    attach: function () {
      // Opens the learn tab to start.
      $('.horizontal-tab-button.last a').click();
      
      // When you click the try tab, if the video is playing, pause it.
      $('.horizontal-tab-button.first a').click(function () {
        var playerId = $('.field-name-field-activity-video .jwplayer').attr('id');
        var player = jwplayer(playerId);
        if (player.getState() == 'PLAYING') {
          player.pause();
        }
      });
      // return user to the try tab when closing an interactive
      $("a.colorbox-load").colorbox({
	      onCleanup: function() {
		      $('.horizontal-tab-button.first a').click();
        },
      });
    }
  };
})(jQuery);