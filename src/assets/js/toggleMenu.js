(function() {

  'use strict';

  $(document).ready(function() {

    function activateOverlay() {
      $('.js-menu-overlay').toggleClass('is-active');
    }

    // Toggle left menu
    $(document).on('click', '.js-toggle-left-menu', function() {
      $('body').toggleClass('left-menu-is-opened');
      activateOverlay();
    });

    // Toggle right menu
    $(document).on('click', '.js-toggle-top-menu', function() {
      $('body').toggleClass('top-menu-is-opened');
      activateOverlay();
    });

    $(document).on('click', '.js-menu-overlay', function() {
      $(this).removeClass('is-active');
      $('body').removeClass('top-menu-is-opened left-menu-is-opened');
    });

  });

})();
