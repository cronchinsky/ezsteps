(function ($) {
  Drupal.behaviors.ezstepsVideoControls = {
    attach: function () {
      
      var playerId = $('.field-name-field-activity-video .jwplayer').attr('id');
      var player = jwplayer(playerId);
      player.setControls(false);
      player.setMute(false);
      function togglePlayer(justClasses) {
        if (!justClasses) {
          justClasses = false;
        }
        if (!$('#ezsteps-video-play-pause').hasClass('ezsteps-paused')) {
          if (!justClasses) player.pause();
          $('#ezsteps-video-play-pause').addClass('ezsteps-paused');
          $('#ezsteps-video-play-pause').text('Play');
        }
        else {
          if (!justClasses) player.play();
          $('#ezsteps-video-play-pause').removeClass('ezsteps-paused');
          $('#ezsteps-video-play-pause').text('Pause');
        }
       
        return false;
      }
     
      $('#ezsteps-video-controls').hide();
      $('.field-name-field-activity-video, .field-name-field-start-here-video').hover(function () {
        $(this).find('#ezsteps-video-controls').fadeIn(100);
      }, function () {
        $(this).find('#ezsteps-video-controls').fadeOut(100);
      });
     
      $('#ezsteps-video-play-pause').click(function () {
          togglePlayer();
        });
      
      $('#ezsteps-video-mute').click(function () {
        $(this).toggleClass('ezsteps-muted');
        if (player.getMute()) {
          $(this).text('Mute');
        }
        else {
          $(this).text('Unmute');
        }
        player.setMute();
        return false;
      });
      
      $('#ezsteps-video-restart').click(function () {
        player.seek(0);
      });
      
      player.onDisplayClick(function () {
        togglePlayer(true);
      });
    }
  };
})(jQuery);