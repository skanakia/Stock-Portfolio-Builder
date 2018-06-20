

$(document).ready(function () {
    $('.parallax').parallax();
    $('.modal').modal();
    // $.fn.modal.Constructor.prototype.enforceFocus = function() {};

    var tempStock = [];

    $("#get-info").on("click", function (event) {
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
                'Authorization': 'Bearer NnNztGC751WHUWbfcdHhHOuwTQNO',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            console.log(response);
            var symbol = response.securities.security[0];

            var compObj = {
                "company": symbol
            }

            $.post("/api/temporary", compObj)
                .then(function (res) {
                    // console.log(res.data);

                    tempStock.push(res);



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
        // tempStock[0].remove = -1;
        // var stockPush = JSON.parse(tempStock[0])
        console.log(tempStock);

        $.ajaxSetup({
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        $.post("/api/portfolio", JSON.stringify(tempStock))
        .then(function (res) {
            console.log("Added stock! " + res);
            // tempStock = [];
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
});