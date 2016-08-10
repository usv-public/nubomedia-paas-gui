(function() {

  'use strict';

  $(document).ready(function() {

    var clipboard = new Clipboard('.js-clipboard-btn');
    var copyTooltip = $('.js-clipboard-btn');

    copyTooltip.tooltip({
      container: 'body',
      html: true,
      trigger: 'manual',
      title: 'Copied!'
    });

    //Show tooltip on copy success
    clipboard.on('success', function(e) {
      copyTooltip.tooltip('show');
    });

    // Hide the copy tooltip
    $(document).on('click', function(e) {
      if (e.target !== copyTooltip[0])
        copyTooltip.tooltip('hide');
    });
  });

})();
