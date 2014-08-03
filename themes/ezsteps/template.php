<?php

/**
 * Implements template_preprocess_field().
 * 
 * Adds the learn more hover js to module objective fields.
 */
function ezsteps_preprocess_field($variables, $hook) {
  if ($variables['element']['#field_name'] == 'field_module_objectives') {
    drupal_add_js(drupal_get_path('theme','ezsteps') . '/js/learn-more-hover.js');	
  }
  if ($variables['element']['#field_name'] == 'field_activity_video_hosted') {
    //drupal_add_js('http://admin.brightcove.com/js/BrightcoveExperiences.js', 'external');
    //drupal_add_js(drupal_get_path('theme','ezsteps') . '/js/ezstepsBrightcove.js', array('type' => 'inline', );	
  }
}

/**
 * Implements template_preprocess_node().
 * 
 * Adds theme hook suggestions for teaser view modes.
 * Adds ezsteps utility javascript to activities
 */
function ezsteps_preprocess_node(&$vars) {
 if($vars['view_mode'] == 'teaser') {
    $vars['theme_hook_suggestions'][] = 'node__' . $vars['node']->type . '__teaser';   
    $vars['theme_hook_suggestions'][] = 'node__' . $vars['node']->nid . '__teaser';
  }
  if ($vars['node']->type == 'activity')  {
  	drupal_add_js(drupal_get_path('theme','ezsteps') . '/js/ezsteps.js');
  }
}

/** Overrides the file download link **/
function ezsteps_file_link($variables) {
  $file = $variables['file'];
  $icon_directory = $variables['icon_directory'];

  $url = file_create_url($file->uri);
  $icon = theme_image(array(
    'path' => drupal_get_path('theme', 'ezsteps') . '/images/Flyer-icon.png',
    'attributes' => array(),
  ));

  // Set options as per anchor format described at
  // http://microformats.org/wiki/file-format-examples
  $options = array(
    'attributes' => array(
      'type' => $file->filemime . '; length=' . $file->filesize,
    ),
  );

  // Use the description as the link text if available.
  if (empty($file->description)) {
    $link_text = $file->filename;
  }
  else {
    $link_text = $file->description;
    $options['attributes']['title'] = check_plain($file->filename);
  }
  $image_options = $options + array('html' => TRUE);
  return '<div class="file"><span class="ezsteps-icon-link">' . l($icon, $url, $image_options) . '</span> <span class="ezsteps-file-link">' . l($link_text, $url, $options) . '</span></div>';
}

/**
 * Implements template_preprocess_html().
 * 
 * Adds header to prevent IE compatibility mode
 */
function ezsteps_preprocess_html(&$vars) {
  // Send X-UA-Compatible HTTP header to force IE to use the most recent
  // rendering engine or use Chrome's frame rendering engine if available.
  // This also prevents the IE compatibility mode button to appear when using
  // conditional classes on the html tag.
  if (is_null(drupal_get_http_header('X-UA-Compatible'))) {
    drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');
  }
}