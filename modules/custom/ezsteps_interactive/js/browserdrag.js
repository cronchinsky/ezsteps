
/****************************
 *     BROWSER DRAG			*
 *							*
 *							*
 **************************/
 

$(document).ready(function () {
	

	// items that are successfully dropped go here!
	var droppedItems = [];
	
	var dragItems = ['ezsteps_toolbar','address_bar','scrollbar','titlebar','display'];
	
	var incFeedback = [];
	
	incFeedback[0] = 'Remember, the Toolbar is near the top of the browser and is where you will find the back, home and refresh buttons.';
	
	incFeedback[1] = 'Remember, the Address Bar is the part of the browser where you enter the URL for the page you wish to visit.';
	
	incFeedback[2] = 'Remember, the Scroll Bar is usually to the right of the display window and allows you to move up and down (scroll) the page you are viewing.';
	
	incFeedback[3] = 'Try Again.  Remember, the Title Bar is at the very top of the browser and displays the title of the page you are currently viewing.';
	
	incFeedback[4] = 'Remember, the Display Window is the area of the browser that displays the page you are viewing.';
	
	var isDown = false;
	
	   $(document).mousedown(function () {
		   
		   clearFeedback();
        isDown = true;

    });

    // if mouse is up, we know it. 
    $(document).mouseup(function () {
        if (isDown) isDown = false;
    });
	
	placeItems();
	
	function placeItems()
	{
		var leftPos = 202;
		
		for (var i = 0; i < dragItems.length; i++)
		{
			var spacing = 30;

			var myItem = '#'+dragItems[i];
			
			var myWidth = toInt($(myItem).css('width'))+5;
			
			$(myItem).css('width',myWidth);
			
			var itemPos = makeString(leftPos);
			
			$(myItem).css('left',itemPos);
			
			leftPos = leftPos + myWidth + spacing;
		}
	}
	
	// helper functions - string to integer and back
	function toInt(myString)
	{
		var myInt;
		
		myInt = parseInt(myString.substring (0,myString.length-2));
		
		
		return myInt;
		
	}
	function makeString(myInt)
	{
		var myString;
		
		myString = myInt.toString()+'px';
	
		return myString;
	}
	function removeHoverStates()
	{
		for (var i = 0; i < dragItems.length; i++)
		{
			var myTarget = '#'+dragItems[i]+'_target';
			
			var hoverClass = 'hover';
			
			$(myTarget).removeClass(hoverClass);
		}
	}
	
	checkInterval();
	
	function checkInterval()
	{
	  window.setInterval(function () {

        if (!isDown) 
		{
			
			removeHoverStates();
		}

    }, 50);
	}
	
	 // collision function for testing overlaps
	 // first: target,
	 // second: item
    var overlaps = (function () {
		
		
        function getPositions(elem) {
			
			
            // declare variables
            var pos, width, height;

            // set position 
            pos = $(elem).position();
			
			
            // set width 
            width = $(elem).width();

            // set height
            height = $(elem).height();
			
			// return corner coordinates of area taken up by object
            return [[pos.left, pos.left + width], 
					[pos.top, pos.top + height]];
					
			
        }

        function comparePositions(p1, p2) {
            // what are r1 and r2 equal to? 
            var r1, r2;

            // if p1 is less than p2, r1 = p1. else, r1 = p2.
		
			// if left of first element is less than left of second
			// r1 becomes the first array 
            r1 = p1[0] < p2[0] ? p1 : p2;
			
			// if right of first element is less than right of second
            // if p1 is less than p2, r2 = p2.  else, r1 = p1. 
            r2 = p1[0] < p2[0] ? p2 : p1;
			
			// if
            return r1[1] > r2[0] || r1[0] === r2[0];
        }

        // anonymous return function (target, item)
        return function (a, b) {

            // get the area occupied by element a. 
			
			// gets an array of [left, right] [top, bottom] for target
            var pos1 = getPositions(a),

                // get an array for item
                pos2 = getPositions(b);

						// [left, right] of target & item
            return comparePositions(pos1[0], pos2[0]) &&
			
						// [top, bot] of first & second elements
					comparePositions(pos1[1], pos2[1]);
        };
    })();

 
	
	function searchDropped (myItem) 
	{
		
		for (var i = 0; i < droppedItems.length; i++)
		{
			if (droppedItems[i] == myItem) return true;
		}
		return false;
	}
	$('.draggable li').draggable({
		
		revert: 'invalid',
		start: function (event, ui) {
			
			var myLeft = $(this).css('left');
			var myTop = $(this).css('top');
		
			
			
		},
		drag: function (event, ui) {
			
			for (var j = 0; j < dragItems.length; j++)
			{
				
				// declare current item 
				var myTarget = dragItems[j];
				
				// get ID of target based on array
				var targetID = '#'+myTarget+'_target';
				
				// get hover class that is added to the target on hover.
				var hoverClass = 'hover';
				
				// if there is a collision between dragged item and target
				if (overlaps(targetID, this))
				{
					
					// add the hover class to the target
					
			
					
					var itemID = $(this).attr('id');
					
					
					// the address bar will not light up if your item is the toolbar
					if ((itemID != 'ezsteps_toolbar' || targetID != '#address_bar_target')
					
						// the toolbar will not light up if your item is the address bar
						&& (itemID != 'address_bar' || targetID != '#ezsteps_toolbar_target')
						
						//don't light up the titlebar target if the toolbar target is in hover state
						&& (($('#ezsteps_toolbar_target').attr('class') != 'ui-droppable hover' || targetID != '#titlebar_target')) 
						&& ($('#address_bar_target').attr('class') != 'ui-droppable hover' || targetID != '#titlebar_target'))
						 
			
						
						
						{
					
						// if the scrollbar isn't active OR I em touching the scrollbar area
						if (($('#scrollbar_target').attr('class') != 'ui-droppable hover' || 
						targetID =='#scrollbar_target'))
						{					
							$(targetID).addClass(hoverClass);
							$('#scrollbar_target').droppable('option','tolerance','touch');
						}
						
						
					}
						
						// for whatever target we just got into, shut off other adjacent targets
						switch (myTarget)
						{
							case 'address_bar':
							// if we are not dragging the toolbar, remove the toolbar class
							if (itemID !='toolbar')
							$('#ezsteps_toolbar_target').removeClass('hover');
							
							$('#titlebar_target').removeClass('hover');
							
							if ($('#titlebar_target').attr('class')!='ui-droppable hover')
							{
								$('#titlebar_target').droppable('option','tolerance','fit');
								$('#address_bar_target').droppable('option','tolerance','touch');
							}
							break;
							
							case 'scrollbar':
							
							$('#display_target').removeClass('hover');
							$('#titlebar_target').removeClass('hover');
							$('#display_target').droppable('disable');
							
							break;
							
							case 'ezsteps_toolbar':
							
							console.log('toolbar');
							$('#display_target').removeClass('hover');
							
							$('#titlebar_target').removeClass('hover');
								
							if ($('#titlebar_target').attr('class')!='ui-droppable hover')
							{
									$('#titlebar_target').removeClass('hover');
								$('#titlebar_target').droppable('option','tolerance','fit');	
								$('#ezsteps_toolbar_target').droppable('option','tolerance','touch');
							}
							break;
							
							case 'titlebar':
							
							console.log('titlebar');
							if ($('#ezsteps_toolbar_target').attr('class')!='ui-droppable hover'
							&& $('#address_bar_target').attr('class')!='ui-droppable hover')
							{
								$('#ezsteps_toolbar_target').droppable('option','tolerance','fit');
								$('#address_bar_target').droppable('option','tolerance','fit');
								$('#titlebar_target').droppable('option','tolerance','fit');
							}
				
							break;
							
							case 'display':
						
							//$('#titlebar_target').removeClass('hover');
							
							// make sure it doesn't land on scrollbar if it is not highlighted. 
							if ($('#scrollbar_target').attr('class') != 'ui-droppable hover')
							{
								$('#display_target').droppable('enable');
								$('#scrollbar_target').droppable('option','tolerance','intersect');
								$('#display_target').droppable('option','tolerance','touch');
							}
							else
							{
								$('#scrollbar_target').droppable('option','tolerance','touch');
								$('#display_target').droppable('option','tolerance','fit');
							}
						
							break;
							
						
						
					}
				
         	    }
				else
				{
					$(targetID).removeClass(hoverClass);
					

				}
			}
			
			
			},
		
		stop: function (event, ui) 
		{
			
			
			
			var myID = $(this).attr('id');
			if (searchDropped(myID) == false) 
			{
				var index = dragItems.indexOf(myID);
				showFeedback('incorrect','correct', index);
			}
			
			}
	
	});
	
	function clearFeedback()
	{
		$('#feedback_word').text('');
		$('#feedback_blurb').text('');
		$('#feedback_icon').removeClass('incorrect_icon').removeClass('correct_icon');
	}
	function showFeedback(add, remove, index)
	{

		$('#feedback_word').removeClass(remove+'_text');
		$('#feedback_word').addClass(add+'_text');
		
		var myWord = (add == 'correct') ? 'Correct!' : 'Try again.';
		
		var myBlurb = (add == 'correct') ? '' : incFeedback[index];
		
		if (droppedItems.length >=5)
		{
			myWord = 'Activity Complete!';
		}
		
		$('#feedback_word').text(myWord);
		
		$('#feedback_icon').removeClass(remove+'_icon');
		$('#feedback_icon').addClass(add+'_icon');
		
		$('#feedback_blurb').text(myBlurb);
	}
	
	setTargets();
	setTolerance();
	function setTargets()
	{
		for (var i = 0; i < dragItems.length; i++)
		{
			var myTarget = '#'+dragItems[i] + '_target';
		
			var myItem = '#'+dragItems[i];
		
			$(myTarget).droppable({
		
			/*hoverClass: "address_bar_hover",*/
			accept: myItem,
			
			
			
			drop: function (event, ui)
			{
				var droppedItem =  $(ui.draggable).attr('id');
			
				if (searchDropped(myItem) == false) droppedItems.push(droppedItem)
			
				showFeedback('correct','incorrect');
			}
		
			});
		}
		
	
	
	}
	function setTolerance()
	{
		$('#address_bar_target').droppable('option','tolerance','touch');
		$('#scrollbar_target').droppable('option','tolerance','touch');
		$('#titlebar_target').droppable('option','tolerance','intersect');
		$('#display_target').droppable('option','tolerance','pointer');
		$('#ezsteps_toolbar_target').droppable('option','tolerance','touch');
	}
});