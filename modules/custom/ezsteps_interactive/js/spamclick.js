
/****************************
 *     CLICKABLE			*
 *							*
 **************************/
 

$(document).ready(function () {
	
	// items that are successfully dropped go here!

    var found =0;
	
	var isDown = false;
	
	   $(document).mousedown(function () {
		   
		   
        isDown = true;

    });

    // if mouse is up, we know it. 
    $(document).mouseup(function () {
        if (isDown) isDown = false;
    });
	
	function answers ()
	{
	  var feedback = [];
	
	  feedback[0] = 'Official bank correspondence will never come from a personal email address.';
		
	  feedback[1] = 'Generic, impersonal greetings are common in scam emails.';
	
	  feedback[2] = 'Multiple spelling or grammatical errors in an official email are a red flag.';
	
	  feedback[3] = 'Links to outside websites, especially one with an unfamiliar web address, should be treated with caution.';
	
	  feedback[4] = 'Email that insists on immediate action should be a cause for concern.';
	  
	  return feedback;
	}
	 function extractNum(myString) {
            var testNum = myString.substring(myString.length - 2, myString.length - 1);

            var digits = 1;

            if (!isNaN(testNum)) digits = 2;

            var myNum = parseInt(myString.substring(myString.length - digits, myString.length));

            return myNum;
        }
	
	function add_answers()
	{
		var headers=['Strange Sender Address','Awkward Greeting','Spelling Mistakes','Link to Website','Alarmist Language'];
		 
		 // answers
		var fb = answers();
		// append
		for (var i = 0; i < 5; i++)
		{
			var n = i+1;
			$('#answer_container').append('<div id="ans'+n+'" class="invisible_answer"><h3>'+headers[i]+'</h3><p>'+fb[i]+'</p></div>');
			
			var hotspot = $('#spam_email div:nth-child('+n+')');
		}
	}
	function congrats()
	{
		var myBlurb = 'You found all the clues that indicate this is a scam email.';
		
		myWord = 'Activity Complete!';
			
		$('#feedback_word').text(myWord);
		
		$('#feedback_icon').addClass('correct_icon');
		
		$('#feedback_blurb').text(myBlurb);
	}
	function interact()
	{
		$('#spam_email div').click(function () {
			
			if ($(this).attr('class') != 'found')
			{
			
			$(this).attr('class','found');
			var id = $(this).attr('id');
			
			var num = extractNum(id);
			
			var box = '#ans'+num;
			
			$(box).removeClass('invisible_answer');
			$(box).addClass('visible_answer');
			$(box).animate({
				opacity:1
				}, 1000, function () {});
			}
			
			found++;
			
			if (found >=5) 
			{
				congrats();
			}
			});
	}
	function init ()
	{
	
		add_answers();	
		interact();
	}
	init();
});