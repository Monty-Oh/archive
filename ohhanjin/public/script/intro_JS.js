//모듈:명사를 사용
//함수:동사를 사용
//변수:명사를 사용
/*
$(document).on('mouseenter','.mainTexts',function(){
  const mainTexts = document.querySelector('.mainTexts');
  mainTexts.classList.remove('animated','bounceInDown');
  mainTexts.classList.add('animated','pulse','delay-0s');
});
*/

//Down 버튼이 눌렸을때의 이벤트, 버튼과 메인이 사라진다.
$(document).on('click', '.button2', function() {
  const introtexts = document.querySelector('.introtexts');
  const button2 = document.querySelector('.button2');
  const button1 = document.querySelector('.button1');
  button2.classList.remove('animated', 'bounce');
  $('.button2').css('animation-delay', '0s');
  $('.button2').css('animation-iteration-count', '1');
  button1.classList.add('animated', 'bounceOutDown');
  $('.button1').css('animation-duration', '1s');
  $('.introtexts').css('animation-delay', '0.2s');
  introtexts.classList.add('animated', 'bounceOutDown');

  //previous
  const previous = document.querySelector('.previous');
  previous.classList.remove('animated', 'fadeIn');
  previous.classList.add('animated', 'fadeOut');
  //previous

  setTimeout(function() {
    callMain();
  }, 1000);
});

//메인으로 넘어갈때의 동작
function callMain() {
  $('.mainPage').css('display', 'inline');
  $('.intro').css('display', 'none');
  $('.previous').css('display', 'none');
  //애니메이션 재설정
  $('.backButton,.projects,.practice,.folder3,.folder4,.texts').each(function(index, item) {
    item.classList.remove('animated', 'fadeOut');
    item.classList.add('animated', 'fadeIn');
  });
}







//첫 페이지 -> 메인페이지 ajax사용
/*
function movetoMain() {
  $.ajax({
    type: "GET",
    url: "./fix2",
    dataType: "html",
    cache:false,
    error: function() {
      alert('통신실패!!');
    },
    success: function(data) {
      $('html').html(data);
      history.pushState({
        "html": data
      }, `OHJ's Portfolio`, 'fix2');
    }
  });
}
*/
