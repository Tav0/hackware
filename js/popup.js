function deselect(e) {
  $('#popupBox').slideFadeToggle(function() {
    e.removeClass('selected');
  });    
}

$(function() {
  $('#logging').on('click', function() {
    if($(this).hasClass('selected')) {
      deselect($(this));               
    } else {
      $(this).addClass('selected');
      $('#popupBox').slideFadeToggle();
    }
    return false;
  });

  $('#x').on('click', function() {
    deselect($('#logging'));
    return false;
  });
});

$.fn.slideFadeToggle = function(easing, callback) {
  return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast',
      easing, callback);
};


