$(document).on('click', '.backButton', function() {
  //각 요소들에 대한 애니메이션 재설정
  $('.backButton,.projects,.practice,.folder3,.folder4,.texts').each(function(index, item) {
    item.classList.remove('animated', 'fadeIn');
    item.classList.add('animated', 'fadeOut');
  });
  //버튼이 눌리면 기존의 창을 모두 닫고 애니메이션이 끝나면 다른 CSS의 애니메이션 재설정
  closeAllWindow();
  setTimeout(function() {
    callIntro();
  }, 1500);
});

function callIntro() {
  $('.intro').css('display', 'inline');
  $('.mainPage').css('display', 'none');
  //애니메이션 재설정

  const previous = document.querySelector('.previous');
  previous.classList.remove('animated', 'fadeOut');
  previous.classList.add('animated', 'fadeIn');
  $('.previous').css('display', 'inline');


  $('.introtexts, .button1').each(function(index, item) {
    item.classList.remove('animated', 'bounceOutDown');
    item.classList.add('animated', 'bounceInDown');
  });

  $('.button1').css({
    'animation-delay': '0s',
    'animation-iteration-count': '1',
    'animation-duration': '2.6'
  });

  const button2 = document.querySelector('.button2');
  button2.classList.add('animated', 'heartBeat');
  $('.button2').css({
    'animation-delay': '5.5s',
    'animation-iteration-count': 'infinite'
  });
}

//현재 열린 모든 윈도우창을 종료
function closeAllWindow() {
  $('.window').css('display', 'none');
}




/*
function ajaxTest2() {
  $.ajax({
    type: "GET",
    url: "./fix1",
    dataType: "html",
    cache: false,
    error: function() {
      alert('통신실패!!');
    },
    success: function(data) {
      $('.mainPage').html(data);
      location.reload();
    }
  });
}

function noEvent() {
	if (event.keyCode == 116) {
		event.keyCode= 2;
		return false;
	} else if(event.ctrlKey && (event.keyCode==78 || event.keyCode == 82)) {
	  return false;
	}
}
document.onkeydown = noEvent;



$(window).bind("popstate", function(event) {
  var data = event.originalEvent.state;
  if (data) {
    ajaxTest2();
  } else {
    var url = "/fix1";
    $(location).attr('href', url);
  }
});*/
