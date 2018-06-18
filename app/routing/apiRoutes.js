var path = require("path");
var stockData = require("../data/data.js");
var express = require("express");
var request = require("request");
var $ = require("jquery");
var moment = require('moment');

module.exports = function (app) {


    app.get('/api/portfolio', function (req, res) {
        res.json(stockData);
    });



    app.post('/api/portfolio', function (req, res) {
        console.log(req.body);
        var temp =
            {
                "company": req.body.company.symbol,
                "data": []
            };

        var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + req.body.company.symbol + "&outputsize=compact&apikey=POTSVIBL1MZ1SJIO"

        var close = "4. close"
        request(queryURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var parsedBody = JSON.parse(body);
                var results = parsedBody['Time Series (Daily)'];
                for (var key in results) {
                    if (results.hasOwnProperty(key)) {
                        var day = moment(key).format("MMM DD YYYY");
                        var dailyQuote = {
                            "date": day,
                            "open": results[key]["1. open"],
                            "high": results[key]["2. high"],
                            "low": results[key]["3. low"],
                            "close": results[key]['4. close']
                        }
                        temp.data.push(dailyQuote);
                    }
                }
                console.log(temp);

            }
        })


    });
};

