<?php
/**
 * @file
 * Display the JW Player.
 *
 * Variables available:
 * - $html_id: Unique id generated for each video.
 * - $width: Width of the video player.
 * - $height: Height of the video player.
 * - $file_url: The url of the file to be played.
 * - $jw_player_inline_js_code: JSON data with configuration settings for the video player.
 * - $poster: URL to an image to be used for the poster (ie. preview image) for this video.
 *
 * @see template_preprocess_jw_player()
 */
?>
<div class="jwplayer-video">
  <video id="<?php print $html_id ?>" width="<?php print $width ?>" height="<?php print $height ?>" controls="controls" preload="none"<?php if(isset($poster)) : ?> poster="<?php print $poster ?>"<?php endif ?>>
    <source src="<?php print $file_url ?>"<?php if (isset($file_mime)): ?> type="<?php print $file_mime ?>"<?php endif ?> />
  </video>
  <div id="ezsteps-video-controls">
    <a href="#" id="ezsteps-video-play-pause" class="ezsteps-paused ezsteps-video-control">Play</a>
    <a href="#" id="ezsteps-video-mute" class="ezsteps-video-control">Mute</a>
    <a href="#" id="ezsteps-video-restart" class="ezsteps-video-control">Restart</a>
  </div>
</div>
<?php if(isset($jw_player_inline_js_code)): ?>
  <script type="text/javascript">
    jwplayer('<?php print $html_id ?>').setup(<?php print $jw_player_inline_js_code?>);
  </script>
<?php endif ?>
