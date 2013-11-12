	
<link rel="stylesheet" type="text/css" href="/sites/ezsteps.edc.org/modules/custom/ezsteps_interactive/css/easysteps.css"/>

<script type="text/javascript" src="../../../misc/jquery.js?v=1.4.4"></script>
<script type="text/javascript" src="/sites/ezsteps.edc.org/modules/custom/ezsteps_interactive/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.js"></script>
<script type="text/javascript" src="/sites/ezsteps.edc.org/modules/custom/ezsteps_interactive/js/browserdrag.js"></script>
<script type="text/javascript" src="/sites/ezsteps.edc.org/modules/custom/ezsteps_interactive/js/jquery.ui.touch-punch.min.js"></script>

<div id="wrapper-browser">
	<h2>Activity 1: Learning Internet and Web Browser Basics</h2>
	<p id="directions">Directions: Drag the words to place them in the proper locations on the browser image.</p>
	
	<div id="field">
	<!-- draggable items-->
		<ul class="draggable">
			<li id="ezsteps_toolbar">Toolbar</li>
		    <li id="scrollbar">Scroll Bar</li>
		    <li id="display">Display Window</li>
		    <li id="titlebar">Title Bar</li>
		    <li id="address_bar">Address Bar</li>
		</ul>
		<div class="clear-both"></div>
	
		<!-- targets-->
		<div id="browser_container">
			<div id="browser_image">
				<div id="ezsteps_toolbar_target"></div>
				<div id="address_bar_target"></div>
				<div id="titlebar_target"></div>
				<div id="display_target"></div>
				<div id="scrollbar_target"></div>
			</div>
		</div>
	</div>
	<!-- feedback-->
	<div id="feedback">
	   <div id="feedback_icon" class="no_icon"></div>
	   <div id="feedback_text"><span id="feedback_word"></span><span id="feedback_blurb"></span></div>
	   <div class="clear-both"></div>
	</div>
</div>