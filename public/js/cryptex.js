function userLoginInitiate(url) {
  localStorage.setItem("tempURL", location.href);
  window.location = location.origin + url;
}


function startGame() {
  $.post("/cryptex/start")
    .done(function (eer) {
      window.location = "/cryptex/play";
    }).fail(function (err) {
      alert('Sorry for any inconvenience, Try again later. If problem persists, contact admin@plinth.in');
    });
}

function submitAns() {
  $.post("/cryptex/submitC", { answer: $('#answer').val() })
    .done(function (status) {
      console.log(status.response);
      if(status.response){
        UIkit.notification({
          message: 'Congratulations! You got That Right.',
          status: 'primary',
          pos: 'top-center',
          timeout: 1000
        });
        setTimeout(function () {
          location.reload();
        }, 2000);
      } else {
        UIkit.notification({
          message: 'Oops! Not a right answer.',
          status: 'primary',
          pos: 'top-center',
          timeout: 2000
        });
      }
    
    }).fail(function (err) {
      alert('Sorry for any inconvenience, Try again later. If problem persists, contact admin@plinth.in');
    });
}

$(document).ready(function() {
  $('.open-menu').on('click', function() {
     $('.overlay').addClass('open');
  });
 
  $('.close-menu').on('click', function() {
    $('.overlay').removeClass('open');
  });
  setTimeout(function () {
    $('#nav-delay').css({"visibility":"visible"}).fadeIn(400);
}, 6000);
});