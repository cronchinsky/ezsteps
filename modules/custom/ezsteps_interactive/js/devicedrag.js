
/****************************
 *     BROWSER DRAG			*
 *							*
 *							*
 **************************/
 

$(document).ready(function () {
	
	// items that are successfully dropped go here!
	var droppedItems = [];
	
	var dragItems = ['mouse','cpu','dvd','keyb','monitor'];
	
	var corFeedback = [];
	
	var incFeedback = [];
	
	corFeedback[0] = "The mouse helps move the pointer.";
	
	corFeedback[1] = "The brain of the computer is found in the CPU.";

	corFeedback[2] = "The CD/DVD drive is used to hold disks that store information.";
	
	corFeedback[3] = "The keyboard is used to type information.";
	
	corFeedback[4] = "The monitor is the display device of the computer.";
	
	incFeedback[0] = "Remember, the mouse is used to control the pointer, so it would have to be small enough to move.";
	
	incFeedback[1] = "Remember, the CPU needs to be contained within a protective casing.";
	
	incFeedback[2] = "Remember, the CD/DVD drive is used to hold disks, so look for something you would place disks on.";
	
	incFeedback[3] = "Remember, the keyboard is used to type, so you should see some pressable keys on it.";
	
	incFeedback[4] = "Remember, the monitor is the display device of the computer, where the graphics would appear.";
	
	if (!Array.prototype.indexOf) {
		
		Array.prototype.indexOf = function(obj, start) {
         for (var i = (start || 0), j = this.length; i < j; i++) {
         if (this[i] === obj) { return i; }
     }
     return -1;
}

    }
	
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
		var leftPos = 222;
		
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
	function toInt(myString)
	{
		var myInt;
		
		myInt = parseInt(myString.substring (0,myString.length-2));
		
		// console.log("myInt: " + myInt);
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
		//	console.log('removing hover state');
			var containerID = '#'+dragItems[i]+'_con';
				
				
			var myTarget = '#'+dragItems[i]+'_target';
			
			var regClass = dragItems[i];
			
			var hoverClass = dragItems[i] + '_hover';
			
			$(myTarget).removeClass(hoverClass);
			
			$(myTarget).addClass(regClass);
			
			$(containerID).css('border-color','black');
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
			
			//console.log($(elem).attr('id') + 'pos: ' + pos.left);
			
            // [left, right] [top, bottom]
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
	function disableTargets(currentTarget)
	{
		for (var i = 0; i < dragItems.length; i++)
		{
			var thisTarget = '#' + dragItems[i] +'_target';
			
			if (thisTarget != currentTarget)
				$(thisTarget).droppable('disable');
			else
				$(thisTarget).droppable('enable');
		}
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
				
				var regClass = myTarget;
				
				// get hover class that is added to the target on hover.
				var hoverClass = myTarget+'_hover';
				
				var containerID = '#'+myTarget+'_con';
				
				// if there is a collision between dragged item and target
				if (overlaps(targetID, this))
				{
					// console.log('hover class: ' + hoverClass);
					//	removeHoverStates();
					//	disableTargets(targetID);
						$(containerID).css('border-color','#0072c5');
						$(targetID).removeClass(regClass);
						$(targetID).addClass(hoverClass);
					//	console.log("hitting" + targetID);
         	    }
				else
				{
				//	console.log('no overlap with ' + targetID);
					$(containerID).css('border-color','black');
					$(targetID).removeClass(hoverClass);
					$(targetID).addClass(regClass);
	
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
		
		var myBlurb = (add == 'correct') ? corFeedback[index] : incFeedback[index];
		

		if (droppedItems.length >=5)
		{
			myBlurb = myBlurb + ' Activity Complete!';
		}
		
		$('#feedback_word').text(myWord);
		
		$('#feedback_icon').removeClass(remove+'_icon');
		$('#feedback_icon').addClass(add+'_icon');
		
		$('#feedback_blurb').text(myBlurb);
	}
	
	setTargets();

	function setTargets()
	{
		for (var i = 0; i < dragItems.length; i++)
		{
			var myTarget = '#'+dragItems[i] + '_target';
		
			var myItem = '#'+dragItems[i];
		
			$(myTarget).droppable({
		
			
			accept: myItem,
		
			tolerance: 'touch',
			
			drop: function (event, ui)
			{
				var droppedItem =  $(ui.draggable).attr('id');
				
				
				if (searchDropped(myItem) == false) droppedItems.push(droppedItem)
				
				var index = dragItems.indexOf(droppedItem);
				showFeedback('correct','incorrect', index);
			}
		
			});
		}
		
	
	
	}
	
});