$(".more-details").click(function () {
    next = $(this).find('h3.link').get('0').innerHTML;

    console.log(urls);
    urls.forEach(element => {

        if (element.eventName == next) {
           
            window.location =  (window.location + element.eventUrl).replace(/([^:])(\/\/+)/g, '$1/');

        }
    });
    
});