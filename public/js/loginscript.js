$(document).ready(function () {
    if ($(window).width() > 739) {
        setTimeout(function () {
            $('.divDelay').fadeIn(500);
        }, 3000);
        setTimeout(function () {
            $('.divDelayFoo').fadeIn(500);
        }, 3000);
    } else {
        setTimeout(function () {
            $('.divDelayFoo').fadeIn(500);
        }, 1000);
    }

});

function userLoginInitiate(url) {
    localStorage.setItem("tempURL", location.href);
    window.location = location.origin + url;
}
