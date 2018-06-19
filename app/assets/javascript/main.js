

$(document).ready(function () {
    $('.parallax').parallax();
    $('.modal').modal();
   
    var tempStock=[]

    $(".btn").on("click", function (event) {
        $('.modal').modal('open');
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

            $.post("/api/portfolio", compObj)
                .then(function (res) {
                    // console.log(res.data);

                    tempStock.push(res);

                    

                    var newDiv = $("<div>").attr("class", "company-result");
                    var newH5 = $("<h5>").text(compObj.company.description);
                    var newH6 = $("<h6>").text(res.symbol);
                    $(newDiv).append(newH5);
                    $(newDiv).append(newH6);
                    var newP = $("<p>").text("Regression: " + res.regResults[0].string)
                    var newP2 = $("<p>").text("Expected Return (over the next 5 months): " + (parseFloat(res.regResults[0].equation[0]) * 100) + "%").attr("class", "highlight");
                    $(newDiv).append(newP);
                    $(newDiv).append(newP2);
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




});