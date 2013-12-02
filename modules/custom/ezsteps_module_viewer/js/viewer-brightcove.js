(function ($) {
  Drupal.behaviors.ezstepsTabOpen = {
    attach: function () {
      
      //alert(window.location.hash);
      // only go to the learn tab if there is nothing in the query string/a poll   
      if (!(window.location.hash)) {
         $('.horizontal-tab-button.last a').click();
      }
      
      // When you click the try tab, if the video is playing, pause it.
      $('.horizontal-tab-button.first a').click(function () {
        	pauseVideo();
            window.location.hash = "#try";
          	
      });
      
      $('.horizontal-tab-button.last a').click(function () {
        	// should we restart the video?
        	window.location.hash = "";
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

