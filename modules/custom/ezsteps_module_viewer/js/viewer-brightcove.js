(function ($) {
  Drupal.behaviors.ezstepsTabOpen = {
    attach: function () {
         
      // Hopefully we will add Brightcove API code to stop and start the player
         
      // Opens the learn tab to start.
      $('.horizontal-tab-button.last a').click();
      
      // When you click the try tab, if the video is playing, pause it.
      $('.horizontal-tab-button.first a').click(function () {
        //var playerId = $('.field-name-field-activity-video .jwplayer').attr('id');
        //var player = jwplayer(playerId);
        /*
	    if (player.getIsPlaying()) {
          player.pause();

        } */
      });
    }
  };
})(jQuery);

