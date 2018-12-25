
$('#error').hide();

var orderId;
var fee;


document.getElementById('register-form').onsubmit = function (e) {
    e.preventDefault();

    $('#submit-button').attr("disabled", true);
   
     registerUser();
 
}



function registerUser() {

    var teams = [];
    var team;
 
    var payDetails = '';
    var check = false;

   
    team = {
        name: $('#name').val(),
        email: $('#email').val(),
        phoneNumber: $('#number').val(),
        college: $('#college').val(),
        collegeId: $('#collegeid').val(),
    };

    teams.push(team);
    if (team.name === "" ||
        team.email === "" ||
        team.phoneNumber === "" ||
        team.college === "") {
        check = false;
    }
    else {
        check = true;

    }
 
    payDetails = {
        teamSize: '1',
        teams: teams,
        accomodation: $('#accomodation').val(),
    };

    if (payDetails.teamName === "" ||
        payDetails.teamSize === "" ||
        payDetails.teams === "" ||
        payDetails.accomodation === "") {
        check = false;
    }
    else {
        check = true;
    }

    //fee = mevent.fee;
    
    const dis = mevent.discount;    
    if( ($('#referral').val()).indexOf(dis) > -1 && ($('#referral').val()).length == 10){
        fee = mevent.fee - mevent.fee*0.05;
    } else {
        fee = mevent.fee;
    }
    
    
    
  

    if (check == true) {
        $('#error').hide();
        var data = {
            eventName: mevent.eventName,
            clubName: mevent.clubName,
            mEmail: $('#mEmail').val(),
            referrer:$('#referral').val(),
            details: payDetails,
        };
        $.post("/payment/register/" + mevent.payName,
            { postData: JSON.stringify(data) })
            .done(function (data) {
                document.getElementById("register-form").reset();
                if (data.status) {
                    orderId = data.orderId;
                    $('#submit-button').removeAttr("disabled");
                    $('#register-workshops').modal('hide');
                    $("#payOrderId").html(orderId);
                    $("#payAmount").html(fee);
                    $('#pay-workshops').modal('show');
                }
            }).fail(function (err) {
                alert('Sorry for any inconvenience, Try again later. If problem persists, contact payment@plinth.in');
            });



    } else {
        $('#error').show();
        $('#submit-button').removeAttr("disabled");
        return;
    }

}

$("#cancel-button").click(function (e) {
    e.preventDefault();
    window.location =  (window.location.origin + '/profile').replace(/([^:])(\/\/+)/g, '$1/'); 

});

$("#pay-button").click(function (e) {

    e.preventDefault();

    var name,
        form = document.createElement("form"),
        node = document.createElement("input");



    form.action = "/payment/initiate/" + mevent.payName;
    form.method = 'POST';


    node.name = 'orderId';
    node.value = orderId;
    form.appendChild(node.cloneNode());


    form.style.display = "none";
    document.body.appendChild(form);

    form.submit();

    document.body.removeChild(form);


});