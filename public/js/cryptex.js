function userLoginInitiate(url) {
  window.localStorage.setItem("tempURL", location.href);
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
  $.post("/cryptex/submitC", {
      answer: $('#answer').val()
    })
    .done(function (status) {
      console.log(status.response);
      if (status.response) {
        $.notify({
          message: 'Congratulations! You got that right.'
        }, {
          element: 'body',
          position: null,
          type: "success",
          allow_dismiss: true,
          newest_on_top: false,
          showProgressbar: false,
          placement: {
            from: "top",
            align: "center"
          },
          offset: 20,
          spacing: 10,
          z_index: 1031,
          delay: 5000,
          timer: 1000,
          url_target: '_blank',
          mouse_over: null,
          animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
          }
        });
        setTimeout(function () {
          location.reload();
        }, 2000);
      } else {
        $.notify({
          message: 'Oops! Not a right answer. Try Again! <br> Ask for a hint <b><u>here.</u></b>',
          url: 'https://www.facebook.com/lnmiitquizzinga/',
        }, {
          element: 'body',
          position: null,
          type: "danger",
          allow_dismiss: true,
          newest_on_top: false,
          showProgressbar: false,
          placement: {
            from: "top",
            align: "center"
          },
          offset: 20,
          spacing: 10,
          z_index: 1031,
          delay: 5000,
          timer: 1000,
          url_target: '_blank',
          mouse_over: null,
          animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
          }
        });
        
      }

    }).fail(function (err) {
      alert('Sorry for any inconvenience, Try again later. If problem persists, contact admin@plinth.in');
    });
}

$(document).ready(function () {
  $('.open-menu').on('click', function () {
    $('.overlay').addClass('open');
  });

  $('.close-menu').on('click', function () {
    $('.overlay').removeClass('open');
  });
  setTimeout(function () {
    $('.home-delay').css({
      "visibility": "visible"
    }).fadeIn(400);
  }, 8000);
});
$('.toggle').click(function (e) {
  e.preventDefault();

  var $this = $(this);

  if ($this.next().hasClass('show')) {
    $this.next().removeClass('show');
    $this.next().slideUp(350);
  } else {
    $this.parent().parent().find('li .inner').removeClass('show');
    $this.parent().parent().find('li .inner').slideUp(350);
    $this.next().toggleClass('show');
    $this.next().slideToggle(350);
  }
});
