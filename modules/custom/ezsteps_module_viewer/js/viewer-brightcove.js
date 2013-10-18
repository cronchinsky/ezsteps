(function ($) {
  Drupal.behaviors.ezstepsTabOpen = {
    attach: function () {
         
      // Hopefully we will add Brightcove API code to stop and start the player
             // Brightcove Learning namespace
/*
		var BCLS = {};
		console.log('bsls script');
		//template loaded event handler
		BCLS.onTemplateLoad = function (experienceID) {
		  console.log("template loaded");
		  // get references to the player and API Modules and Events
		  BCLS.player = brightcove.api.getExperience(experienceID);
		  BCLS.APIModules = brightcove.api.modules.APIModules;
		};
		     
		    
		BCLS.onTemplateReady = function (evt) {
		  console.log("template ready");
		  BCLS.videoPlayer = BCLS.player.getModule(BCLS.APIModules.VIDEO_PLAYER);
		};
*/
		
      // Opens the learn tab to start.
      $('.horizontal-tab-button.last a').click();
      
      // When you click the try tab, if the video is playing, pause it.
      $('.horizontal-tab-button.first a').click(function () {

/*
        var isPlaying = BCLS.videoPlayer.getIsPlaying();
        if (isPlaying) {
	        BCLS.videoPlayer.pause();
        }
*/
        
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

