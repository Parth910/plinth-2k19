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