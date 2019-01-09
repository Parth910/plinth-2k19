function userLoginInitiate(url) {
    window.localStorage.setItem("tempURL", location.href);
    window.location = location.origin + url;
}

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