<?php

/**
 * Implements template_preprocess_page().
 * 
 * Adds javascript if serving internal video.
 */
 
function ezsteps_preprocess_page(&$vars) {

  


}


/**
 * Implements template_preprocess_field().
 * 
 * Adds the learn more hover js to module objective fields.
 */
function ezsteps_preprocess_field($variables, $hook) {
  if ($variables['element']['#field_name'] == 'field_module_objectives') {
    drupal_add_js(drupal_get_path('theme','ezsteps') . '/js/learn-more-hover.js');
  }
}

/**
 * Implements template_preprocess_node().
 * 
 * Adds theme hook suggestions for teaser view modes.
 */
function ezsteps_preprocess_node(&$vars) {
  if($vars['view_mode'] == 'teaser') {
    $vars['theme_hook_suggestions'][] = 'node__' . $vars['node']->type . '__teaser';   
    $vars['theme_hook_suggestions'][] = 'node__' . $vars['node']->nid . '__teaser';
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