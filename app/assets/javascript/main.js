

$(document).ready(function () {
    $('.parallax').parallax();
    $('.modal').modal();
    // $.fn.modal.Constructor.prototype.enforceFocus = function() {};

    var tempStock = [];

    $("#get-info").on("click", function (event) {

        tempStock = []; 

        $('#modal1').modal('open');
        event.preventDefault();

        var company = $("#stock").val().trim();

        event.stopPropagation();

        compArr = company.split(' ');
        var compConcat = "";
        for (var i = 0; i < compArr.length; i++) {
            if (i === 0) {
                compConcat += compArr[i];
            } else {
                compConcat += "+" + compArr[i]
            }
        }
        console.log(compConcat);



        $.ajax({
            url: "https://sandbox.tradier.com/v1/markets/search?q=" + compConcat,
            method: "GET",
            headers: {
                'Authorization': 'Bearer qTxFDjZGPZ7ibz8l6Qx8bb1J2Oh7',
                'Accept': 'application/json',

            }
        }).then(function (response) {
            console.log(response);
            var symbol = response.securities.security[0] || response.securities.security;

            var compObj = {
                "company": symbol
            }

            $.post("/api/temporary", compObj)
                .then(function (res) {
                    // console.log(res.data);

                    tempStock.push(res);

                    $("#stock-info").empty();
                    $("#chart").empty();
                    var newCanvas = $("<canvas>").attr({"id": "myChart", "width": "600px", "height": "600px"});
                    $("#chart").append(newCanvas);

                    var newDiv = $("<div>").attr("class", "company-result");
                    var newH5 = $("<h5>").text(compObj.company.description);
                    var newH6 = $("<h6>").text(compObj.company.symbol);
                    $(newDiv).append(newH5);
                    $(newDiv).append(newH6);
                    var newP = $("<p>").text("Regression: " + res.regResults[0].string)
                    var newP2 = $("<p>").text("Expected Return (over the next 5 months): " + (parseFloat(res.regResults[0].equation[0]) * 100) + "%").attr("class", "highlight");
                    var newP3 = $("<p>").text("r ^ 2: " + res.regResults[0].r2 + "  ").attr("class", "r2");
                    $(newDiv).append(newP);
                    $(newDiv).append(newP2);
                    $(newDiv).append(newP3);
                    var r2Desc = $("<button>").text("What's This").attr({ "class": "r2Desc" })
                    $(newP3).append(r2Desc);
                    var newP4 = $("<p>").text("Beta: " + res.beta + "  ").attr("class", "beta");
                    var betaDesc = $("<button>").text("What's This").attr({ "class": "betaDesc" })
                    $(newP4).append(betaDesc);
                    var newP5 = $("<p>").text("Price-to-Book: " + res.priceToBook + "  ").attr("class", "highlight2");
                    var pTBDesc = $("<button>").text("What's This").attr({ "class": "pTBDesc" })
                    $(newP5).append(pTBDesc);
                    $(newDiv).append(newP4);
                    $(newDiv).append(newP5);
                    $("#stock-info").append(newDiv);


                    var ctx = document.getElementById("myChart").getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: res.date,
                            datasets: [
                                {
                                    data: res.close,
                                    borderColor: 'rgba(30, 60, 90, 1.0)'
                                }
                            ]
                        },
                        options: {
                            scales: {
                                xAxes: [{
                                    time: {
                                        unit: 'day'
                                    }
                                }]
                            }


                        }
                    });
                    myChart.canvas.parentNode.style.height = '600px';


                });

        });
    });

    $("#add-btn").on("click", function (event) {
        event.preventDefault();
        console.log(tempStock);

        // $.ajaxSetup({
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     }
        // });

        $.post("/api/portfolio", tempStock[0])
            .then(function (result) {
                console.log(result);
                
                var res = result;

                $("#stock-portfolio").empty();

                for (var i = 0; i < res.length; i++) {

                    var newDiv = $("<div>").attr("class", "portfolio-result");
                    var newH6 = $("<h6>").text((i+1) + ". " + res[i].company);
                    var weightInput = $('<div class="input-field"><input id="' + res[i].company + '" type="text"><label for="' + res[i].company + '">Enter Weight Here...</label></div>');
                    
                    $(newDiv).append(newH6);
                    var newP = $("<p>").text("Regression: " + res[i].regResults[0].string);
                    var newP2 = $("<p>").text("Expected Return (over the next 5 months): " + (parseFloat(res[i].regResults[0].equation[0]) * 100) + "%").attr("class", "highlight");
                    var newP3 = $("<p>").text("r ^ 2: " + res[i].regResults[0].r2 + "  ").attr("class", "r2");
                    $(newDiv).append(newP);
                    $(newDiv).append(newP2);
                    $(newDiv).append(newP3);
                    var r2Desc = $("<button>").text("What's This").attr({ "class": "r2Desc" });
                    $(newP3).append(r2Desc);
                    var newP4 = $("<p>").text("Beta: " + res[i].beta + "  ").attr("class", "beta");
                    var betaDesc = $("<button>").text("What's This").attr({ "class": "betaDesc" });
                    $(newP4).append(betaDesc);
                    var newP5 = $("<p>").text("Price-to-Book: " + res[i].priceToBook + "  ").attr("class", "highlight2");
                    var pTBDesc = $("<button>").text("What's This").attr({ "class": "pTBDesc" });
                    var predictBtn = $("<button>").text("Predict").attr({ "class": "predictBtn btn waves-effect waves-light", "id": res[i].company });
                    var deleteBtn = $("<button>").text("Remove").attr({ "class": "deleteBtn btn waves-effect waves-light", "id": res[i].company });
                    $(newP5).append(pTBDesc);
                    $(newDiv).append(newP4);
                    $(newDiv).append(newP5);
                    $(newDiv).append(weightInput);
                    $(newDiv).append(predictBtn);
                    $(newDiv).append(deleteBtn);
                    $("#stock-portfolio").append(newDiv);

                }

                tempStock = [];
            });
    });

    $("#discard-btn").on("click", function (event) {
        tempStock = [];
    });

    $(document).on("click", ".betaDesc", function (event) {
        $('#modal2').modal();
        $('#modal2').modal('open');
        event.preventDefault();
        event.stopPropagation();
    });

    $(document).on("click", ".pTBDesc", function (event) {
        $('#modal4').modal();
        $('#modal4').modal('open');
        event.preventDefault();
        event.stopPropagation();
    });

    $(document).on("click", ".r2Desc", function (event) {
        $('#modal3').modal();
        $('#modal3').modal('open');
        event.preventDefault();
        event.stopPropagation();
    });

    $(document).on("click", ".predictBtn", function (event) {
        var compId = $(this).attr("id");

        $.ajax({
            url: "/api/portfolio/" + compId,
            method: "GET",
            headers: {
                'Authorization': 'Bearer qTxFDjZGPZ7ibz8l6Qx8bb1J2Oh7',
            }
        }).then(function (response) {
            console.log(response);
            $(".predict").text(response).attr("id", "centerHighlight");
       

            $('#modal5').modal();
            $('#modal5').modal('open');
            event.preventDefault();
            event.stopPropagation();
        });
    });

    $(document).on("click", ".deleteBtn", function (event) {
        var compId = $(this).attr("id");

        $.ajax({
            url: "/api/portfolio/" + compId,
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer qTxFDjZGPZ7ibz8l6Qx8bb1J2Oh7',
            }
        }).then(function (response) {
            console.log(response);
            window.location = '/';
        });
    });

});