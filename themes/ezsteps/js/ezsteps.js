/**
 * @file attaches a hover behavior to the 'learn more' text.
 */
(function ($) {
  Drupal.behaviors.showHide = {
    attach: function () {
			
	$('.toggle').hide();
		
	$('.toggle_link').click(function (e)
	{
		e.preventDefault();
		var myDiv = $(e);		
		$(this).parent().next('.toggle').toggle('fast');	
	});	
    }
  };
})(jQuery);