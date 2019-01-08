$(".back-back-icon").click(function () {
    var url = "" + window.location;
    window.location = url.substring(0, url.lastIndexOf('/'));
});

$("#synopsis").click(function () {
    $("#querycontent").addClass("d-none");
    $("#morecontent").addClass("d-none");
    $("#rulescontent").addClass("d-none");
    $("#synopsiscontent").removeClass("d-none");
});

$("#query").click(function () {
    $("#synopsiscontent").addClass("d-none");
    $("#morecontent").addClass("d-none");
    $("#rulescontent").addClass("d-none");
    $("#querycontent").removeClass("d-none");
});

$("#more").click(function () {
    $("#querycontent").addClass("d-none");
    $("#synopsiscontent").addClass("d-none");
    $("#rulescontent").addClass("d-none");
    $("#morecontent").removeClass("d-none");
});
$("#rules").click(function () {
    $("#synopsiscontent").addClass("d-none");
    $("#morecontent").addClass("d-none");
    $("#querycontent ").addClass("d-none");
    $("#rulescontent").removeClass("d-none");
});


$('#startupContent').hide();
$('#studentContent').hide();
$('#technicalInterns').hide();
$('#managementInterns').hide();
$('#marketingInterns').hide();
$('#writingInterns').hide();
$('#designInterns').hide();
$('#otherInterns').hide();
$('#error').hide();

var orderId;
var fee;
const dis = mevent.discount;



$('#sif_startup_domain option').mousedown(function (e) {
    e.preventDefault();
    $(this).toggleClass('selected');
    switch ($(this).val()) {
        case 'Technical':
            $('#technicalInterns').toggle('show');

            $('#sif_startup_technical').attr('required', function (_, attr) {
                return !attr
            });
            break;
        case 'Management':
            $('#managementInterns').toggle('show');
            $('#sif_startup_management').attr('required', function (_, attr) {
                return !attr
            });
            break;
        case 'Marketing':
            $('#marketingInterns').toggle('show');
            $('#sif_startup_marketing').attr('required', function (_, attr) {
                return !attr
            });
            break;
        case 'Content Writing':
            $('#writingInterns').toggle('show');
            $('#sif_startup_writing').attr('required', function (_, attr) {
                return !attr
            });
            break;
        case 'Designing':
            $('#designInterns').toggle('show');
            $('#sif_startup_design').attr('required', function (_, attr) {
                return !attr
            });
            break;
        case 'Other':
            $('#otherInterns').toggle('show');
            $('#sif_startup_other').attr('required', function (_, attr) {
                return !attr
            });
            break;
        default:
            break;
    }
    $("input:visible, textarea:visible, select:visible").attr("disabled", false);
    $("input:hidden, textarea:hidden, select:hidden").attr("disabled", true);
    $(this).prop('selected', !$(this).prop('selected'));
    return false;
});


$('input[type="radio"][name="sif_type"]').click(function () {
    var inputValue = $('input[type="radio"][name="sif_type"]:checked').val();

    if (inputValue === 'Startup') {


        $('#startupContent').show();
        $('#studentContent').hide();


    } else if (inputValue === 'Student') {
        $('#studentContent').show();
        $('#startupContent').hide();
    }
    $("input:visible, textarea:visible, select:visible").attr("disabled", false);
    $("input:hidden, textarea:hidden, select:hidden").attr("disabled", true);

});

$('#teamSize').on("change", function () {

    var teamContent = "";
    for (var i = 0; i < $(this).val(); i++) {
        if (i == 0) {
            teamContent += '<div class="col-md-6 col-sm-12"><div class="form-group"> <label class="control-label" for="member-name-' + (i) + '">Leader Name*</label>  <input class="form-control input-md" id="member-name-' + (i) + '" type="text" value="' + name + '" required> </div> </div> <div class="col-md-6 col-sm-12"><div class="form-group"> <label class="control-label" for="member-email-' + (i) + '">Leader Email*</label>  <input class="form-control input-md" id="member-email-' + (i) + '" type="email" value="' + email + '" required> </div> </div> <div class="col-md-6 col-sm-12">  <div class="form-group"> <label class="control-label" for="member-number-' + (i) + '">Leader Contact Number*</label><input class="form-control input-md" id="member-number-' + (i) + '" type="number" value="' + contact + '" required> </div> </div> <div class="col-md-6 col-sm-12">  <div class="form-group"> <label class="control-label" for="member-college-' + (i) + '">Leader College*</label><input class="form-control input-md" id="member-college-' + (i) + '" type="text" value="' + college + '" required> </div> </div>';
        } else {
            teamContent += '<div class="col-md-6 col-sm-12"><div class="form-group"> <label class="control-label" for="member-name-' + (i) + '">Member ' + (i) + ' Name*</label>  <input class="form-control input-md" id="member-name-' + (i) + '" type="text" required> </div> </div> <div class="col-md-6 col-sm-12"><div class="form-group"> <label class="control-label" for="member-email-' + (i) + '">Member ' + (i) + ' Email*</label>  <input class="form-control input-md" id="member-email-' + (i) + '" type="email" required> </div> </div> <div class="col-md-6 col-sm-12"> <div class="form-group"><label class="control-label" for="member-number-' + (i) + '">Member ' + (i) + ' Contact Number*</label>  <input class="form-control input-md" id="member-number-' + (i) + '" type="number" required> </div> </div> <div class="col-md-6 col-sm-12"> <div class="form-group"> <label class="control-label" for="member-college-' + (i) + '">Member ' + (i) + ' College*</label>  <input class="form-control input-md" id="member-college-' + (i) + '" type="text" required> </div> </div>';
        }
    }
    $('#team-content').html(teamContent);
});



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
    var test = false;
    const str = $('#referral').val().substring(7, 10);
    if (/^([0-3]|[0-3][0-9]|[0-3][0-9][0-9])$/.test(str)) {
        test = true;
    }

    if (mevent.payName == 'SIF') {
        if ($('input[type="radio"][name="sif_type"]:checked').val() == 'Startup') {
            var domains = [],
                sele = $('option[class="selected"]');
            for (var i = 0, len = sele.length; i < len; i++) {
                domains.push(sele[i].value);
            }

            team = {
                type: $('input[type="radio"][name="sif_type"]:checked').val(),
                startupName: $('#sif_startup_name').val(),
                website: $('#sif_website').val(),
                name: $('#sif_startup_contact_name').val(),
                email: $('#sif_startup_contact_email').val(),
                phoneNumber: $('#sif_startup_contact_contactNumber').val(),
                domains: domains,
                technical: $('#sif_startup_technical').val(),
                management: $('#sif_startup_management').val(),
                marketing: $('#sif_startup_marketing').val(),
                writing: $('#sif_startup_writing').val(),
                design: $('#sif_startup_design').val(),
                other: $('#sif_startup_other').val(),
            };

            if (team.startupName === "" ||
                team.email === "" ||
                team.name === "" ||
                team.phoneNumber === "") {


                check = false;
            } else {

                check = true;
                teams.push(team);
            }

            fee = mevent.fee.startup;


        } else if ($('input[type="radio"][name="sif_type"]:checked').val() == 'Student') {
            team = {
                type: $('input[type="radio"][name="sif_type"]:checked').val(),
                name: $('#sif_student_name').val(),
                email: $('#sif_student_email').val(),
                phoneNumber: $('#sif_student_contactNumber').val(),
                college: $('#sif_student_college').val(),
                city: $('#sif_student_city').val(),
                resume: $('#sif_student_resume').val(),
                linkedin: $('#sif_student_linkedin').val(),
                year: $('#sif_student_year option:selected').val(),
            };

            if (team.name === "" ||
                team.email === "" ||
                team.phoneNumber === "" ||
                team.college === "" ||
                team.city === "" ||
                team.year === "") {


                check = false;
            } else {

                check = true;
                teams.push(team);
            }

            if (($('#referral').val()).indexOf(dis) > -1 && ($('#referral').val()).length == 10 && test) {
                fee = mevent.fee.student * 0.95;
            } else {
                fee = mevent.fee.student;
            }
        }

        payDetails = {
            teams: teams,
        };
    }else if (mevent.payName == 'KA'){
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
        var test = false;
        const str = $('#referral').val().substring(7,10);
        if(/^([0-3]|[0-3][0-9]|[0-3][0-9][0-9])$/.test(str)){
            test = true;
        } 
        const dis = mevent.discount;    
        if( ($('#referral').val()).indexOf(dis) > -1 && ($('#referral').val()).length == 10 && test){
            fee = mevent.fee*0.95;
        } else {
            fee = mevent.fee;
        }
        
    
    } else {
        var teamSS = $('#teamSize option:selected').val();



        for (var i = 0; i < teamSS; i++) {
            team = {
                name: $('#member-name-' + i).val(),
                email: $('#member-email-' + i).val(),
                phoneNumber: $('#member-number-' + i).val(),
                college: $('#member-college-' + i).val(),
            }
            teams.push(team);
            if (team.name === "" ||
                team.email === "" ||
                team.phoneNumber === "" ||
                team.college === "") {
                check = false;
            } else {
                check = true;

            }
        }
        //console.log(teams);
        payDetails = {
            teamName: $('#teamName').val(),
            teamSize: $('#teamSize option:selected').val(),
            teams: teams,
            accomodation: $('#accomodation').val(),
        };

        if (payDetails.teamName === "" ||
            payDetails.teamSize === "" ||
            payDetails.teams === "" ||
            payDetails.accomodation === "") {
            check = false;
        } else {
            check = true;
        }

        if (($('#referral').val()).indexOf(dis) > -1 && ($('#referral').val()).length == 10 && test) {
            if (mevent.payName == 'INT' || mevent.payName == 'AH' || mevent.payName == 'AQ') {

                fee = mevent.fee * payDetails.teamSize * 0.95;

            } else {
                fee = mevent.fee * payDetails.teamSize;
            }
            fee = mevent.fee * 0.95;
        } else {
            fee = mevent.fee;
        }
    }

    if (check == true) {
        $('#error').hide();
        var data = {
            eventName: mevent.eventName,
            clubName: mevent.clubName,
            mEmail: $('#mEmail').val(),
            referrer: $('#referral').val(),
            details: payDetails,
        };
        //console.log(data);
        $.post("/payment/register/" + mevent.payName, {
                postData: JSON.stringify(data)
            })
            .done(function (data) {
                document.getElementById("register-form").reset();
                if (data.status) {
                    orderId = data.orderId;
                    $('#submit-button').removeAttr("disabled");
                    $('#register-competitions').modal('hide');
                    $("#payOrderId").html(orderId);
                    $("#payAmount").html(fee);
                    $('#pay-competitions').modal('show');
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
    window.location = (window.location.origin + '/profile').replace(/([^:])(\/\/+)/g, '$1/');

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
