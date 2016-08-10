(function() {

  $(document).ready(function() {
    'use strict';

    // Toggle form inputs via special checkbox
    // Trebuie sa fac uncheck la checkboxuirle care au fost deja
    // selectate dar care sunt disabled in momentul de fata?

    var inputsToToggle;

    $(document).on('change', '.js-toggle-inputs', function() {
      $(this)
        .closest('.js-toggle-input-container')
        .find('.js-input-to-toggle')
        .prop('disabled', function(index, state) {
          inputsToToggle = $('.js-input-to-toggle')
            .closest('.js-control');

          if (!state) {
            inputsToToggle.addClass('is-disabled');
          } else {
            inputsToToggle.removeClass('is-disabled');
          }

          return !state;
        });
    });
  });

})();
