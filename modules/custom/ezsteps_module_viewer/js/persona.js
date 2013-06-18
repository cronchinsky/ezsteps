(function ($) {
  Drupal.behaviors.ezstepsPersonas = {
    attach: function () {
     $('input[name=persona]').hide();
     $('input[type=submit]').hide();
     $('.field-name-field-persona-picture, article.node-persona header').click(function () {
        $(this).closest('.form-item').find('input[name=persona]').attr('checked',true);
        $('input[type=submit]').click();
     });
    }
  };
})(jQuery);