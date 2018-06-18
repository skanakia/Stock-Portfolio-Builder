$(document).ready(function () {
    $('.parallax').parallax();
    $('.modal').modal();

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
                    console.log(res);

                    var newDiv = $("<div>").attr("class", "company-result");
                    var newH5 = $("<h5>").text(res.name);
                    var newH6 = $("<h6>").text(res.symbol);
                    var ctx = document.getElementById("myChart").getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: res.data,
                        options: options
                    });
                });

        });
    });



});