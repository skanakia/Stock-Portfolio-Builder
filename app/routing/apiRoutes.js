var path = require("path");
// var stockData = require("../data/data.js");
var express = require("express");
var request = require("request");
var $ = require("jquery");
var moment = require('moment');
var regression = require('regression');
const Tradier = require('tradier-client');

const tradier = new Tradier('qTxFDjZGPZ7ibz8l6Qx8bb1J2Oh7', 'sandbox');

module.exports = function (app) {
    var stockData = []
    var temp = [];

    app.get('/api/portfolio', function (req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(content, 'utf-8');
        res.json(stockData);
    });

    app.get('/api/temporary', function (req, res) {
        res.json(temp);
    });



    app.post('/api/temporary', function (req, res) {
        // res.setHeader('Content-Type', 'application/json');
        var temp = {};


        // const params = {
        //     q: req, 
        //     exchanges: ['Q', 'N'],
        //     types: ['stock', 'etf'],
        //   };
          
        //   tradier
        //     .lookup(params)
        //     .then(symbols => {
        //       console.log(symbols[0])
        //     })
        //     .catch(error => {
        //       console.log(error);
        //     })


        // console.log(symbols[0]);
        temp =
            {
                "company": req.body.company.symbol,
                "date": [],
                "close": [],
                "open": [],
                "high": [],
                "low": [],
                "percChange": [0],
                "regressionPoints": [],
                "regResults": [],
                "weight": [],
                "beta": [],
                "priceToBook": [],
                "peRatioHigh": [],
                "peRatioLow": [],
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
                    var perchan = parseFloat((temp.close[i] - temp.close[i - 1]) / temp.close[i - 1]).toFixed(4);
                    temp.percChange.push(perchan);
                }

                for (var i = 0; i < temp.close.length; i++) {
                    temp.regressionPoints.push([parseFloat(i), parseFloat(temp.close[i])]);
                }
                var data = temp.regressionPoints
                var regResult = regression.linear(data, { order: 3, precision: 3 });
                temp.regResults.push(regResult);
                // console.log(temp);

            }

            queryURL2 = "https://api.iextrading.com/1.0/stock/" + temp.company + "/stats"
            request(queryURL2, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body)
                    console.log(result.beta);
                    temp.beta.push(result.beta);
                    temp.priceToBook.push(result.priceToBook);
                    temp.peRatioHigh.push(result.peRatioHigh);
                    temp.peRatioLow.push(result.peRatioLow);

                }
                console.log(temp);
                res.json(temp);
            });
        })

    });

    app.post('/api/portfolio', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        var resData =JSON.parse(JSON.stringify(req.body));
        // if (req.body[0].beta) {

            console.log(resData);
            stockData.push(resData);
        //     console.log(req.body[0].regResults)
        //     stockData.push(req.body[0]);
        // } else {
        //     for (var i = 0; i < stockData.data.length; i++) {
        //         if (stockData[i].company === req.body.company) {
        //             stockData.splice(i, 1);
        //         }
        //     }
        // }

        res.json(stockData);

    });
};

