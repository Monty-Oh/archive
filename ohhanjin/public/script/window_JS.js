$(function() {
  $(".window").draggable({
    start: function(event, ui) {
      $(this).draggable("option", "revert", false);
    }
  });
});

$(document).ready(function() {
  $('.folder').click(function(event) {
    if ($(this).attr('id') == 1) $('.window1').css('display', 'inline');
    else if ($(this).attr('id') == 2) $('.window2').css('display', 'inline');
    else if ($(this).attr('id') == 3) $('.window3').css('display', 'inline');
    else if ($(this).attr('id') == 4) $('.window4').css('display', 'inline');
  })
});

$(document).on('click', '.delete_window', function() {
  $(this).parents('.window').css({
    'display': 'none',
    'top': '50%',
    'left': '50%'
  });
});
