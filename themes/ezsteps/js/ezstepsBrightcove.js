(function ($) {
  Drupal.behaviors.ezstepsBrightcove = {
    attach: function (context) {
   	    console.log(context);
   	    var onTemplateLoad, onTemplateReady, player, videoPlayer, currPos;
		var APIModules, mediaEvent, contentEvent;
	    console.log('loaded brigthcove js');
	    onTemplateLoad = function(experienceID) {
	        player = brightcove.api.getExperience(experienceID);
	        videoPlayer = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);	
	        APIModules = brightcove.api.modules.APIModules;
	        mediaEvent = brightcove.api.events.MediaEvent;
	        console.log('template loaded');
	    }
		
	    onTemplateReady = function(evt) {
	        videoPlayer = player.getModule(APIModules.VIDEO_PLAYER);
			
	        videoPlayer.addEventListener(brightcove.api.events.MediaEvent.STOP, onMediaEventFired);
	        videoPlayer.addEventListener(brightcove.api.events.MediaEvent.BEGIN, onMediaEventFired);
	        videoPlayer.addEventListener(brightcove.api.events.MediaEvent.CHANGE, onMediaEventFired);
	        videoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, onMediaEventFired);
	        videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY, onMediaEventFired);
	        console.log('template ready');
	    }
	    
		
	    function onMediaEventFired(evt) {
	        // alert(evt.type);
			if (evt.type == "mediaStop") {
				currPos = evt.position;
	        }
		}
	
	    function pauseVideo() {
	        console.log('pausing video');
	        videoPlayer.pause();
	    }
		
	    function playVideo() {
	        videoPlayer.play();
	    }
    }
  };
})(jQuery);