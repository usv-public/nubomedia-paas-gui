(function() {

  $(document).ready(function() {
    'use strict';

    // Progress bar simulation
    var progressBar = $('.js-progress-bar');
    var maxValue = $('.js-progress-bar').attr('aria-valuemax');
    var currentValue = $('.js-progress-bar').attr('aria-valuenow');
    var step = 100 / maxValue;
    var width = currentValue * step;

    var notifications = ['small', 'warning', 'danger'];

    progressBar.css('width', width + '%');
    $('.js-progress-label').html(currentValue);

    // Set some custom notification for progress bar
    if (width <= 49) {
      $('.js-progress-notification').html(notifications[0]);
    } else if (width > 49 && width < 75) {
      $('.js-progress-notification').html(notifications[1]);
    } else if (width >= 75) {
      $('.js-progress-notification').html(notifications[2]);
    }

  });

})();
