<img src='<?php print $journal_image; ?>' />
<div id="ezsteps-journal-wrapper" style="padding: 0 40px 20px 50px;">
  <p style="margin:0; padding: 3px 0;">Module <?php print $module_num; ?>: <?php print $module_title; ?></p>
   <p style="margin:0; padding: 3px 0;">Name: <?php print $first_name . ' ' . $last_name; ?></p>
   <p style="margin:0; padding: 3px 0;">Date: <?php print $date; ?></p>
   <br />
   <p>I'm comfortable with the following skills:<br />
      <?php print $radio_yes; ?></p>
   <br />
   <p>I need more practice with these skills: <br />
      <?php print $radio_np; ?></p>
   <br />
   <p style="margin:0; padding: 0;"><?php print $question_a; ?></p>
   <p style="margin:0; padding: 0;"><?php print $response_a; ?></p>
   <br />
   <p style="margin:0; padding:0;"><?php print $question_b; ?></p>
   <p style="margin:0; padding: 0;"><?php print $response_b; ?></p>
</div>
