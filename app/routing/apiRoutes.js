var path = require("path");
var stockData = require("../data/data.js");
var express = require("express");
var request = require("request");
var $ = require("jquery");
var moment = require('moment');
var regression = require('regression');

module.exports = function (app) {


    app.get('/api/portfolio', function (req, res) {
        res.json(stockData);
    });



    app.post('/api/portfolio', function (req, res) {
        console.log(req.body);
        var temp =
            {
                "company": req.body.company.symbol,
                "date": [],
                "close": [],
                "open": [],
                "high": [],
                "low": [],
                "percChange": [0],
                "regressionPoints": [],
                "regResults": []
            };

        var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + req.body.company.symbol + "&outputsize=compact&apikey=POTSVIBL1MZ1SJIO";

        request(queryURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var parsedBody = JSON.parse(body);
                var results = parsedBody['Time Series (Daily)'];
                for (var key in results) {
                    if (results.hasOwnProperty(key)) {
                        var day = moment(key).format("MMM DD YYYY");
                        
                        temp.open.unshift(results[key]["1. open"]);
                        temp.high.unshift(results[key]["2. high"]);
                        temp.low.unshift(results[key]["3. low"]);
                        temp.date.unshift(day);    
                        temp.close.unshift(results[key]['4. close']);
                    }
                }
                for (var i = 1; i < temp.close.length; i++) {
                    var perchan = parseFloat((temp.close[i] - temp.close[i-1]) / temp.close[i-1]).toFixed(4);
                    temp.percChange.push(perchan);
                }
                
                for (var i = 0; i < temp.close.length; i++) {
                    temp.regressionPoints.push([parseFloat(i), parseFloat(temp.close[i])]);
                }
                var data = temp.regressionPoints
                var regResult = regression.linear(data, {order: 3, precision: 3});
                temp.regResults.push(regResult);
                console.log(temp);

            }
            res.json(temp);
        })

        

    });
};

