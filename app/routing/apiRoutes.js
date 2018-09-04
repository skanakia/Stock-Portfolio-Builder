var path = require("path");
// var stockData = require("../data/data.js");
var express = require("express");
var request = require("request");
var $ = require("jquery");
var moment = require('moment');
var regression = require('regression');
const Tradier = require('tradier-client');
var neataptic = require("neataptic");

const tradier = new Tradier('qTxFDjZGPZ7ibz8l6Qx8bb1J2Oh7', 'sandbox');





async function execute(stock) {
    // var myNetwork = undefined;
    if (network) {
        network.clear();
        inputL.clear();
        hidden1.clear();
        hidden2.clear();
        hidden3.clear();
        output.clear();

        console.log("THIS: " + network);
    }

    var inputL = new neataptic.Layer.Dense(1);
    var hidden1 = new neataptic.Layer.LSTM(10);
    var hidden2 = new neataptic.Layer.LSTM(10);
    var hidden3 = new neataptic.Layer.LSTM(10);
    var output = new neataptic.Layer.Dense(1);

    // connect however you want
    inputL.connect(hidden1);
    hidden1.connect(hidden2);
    hidden2.connect(hidden3);
    hidden3.connect(output);

    var network = neataptic.architect.Construct([inputL, hidden1, hidden2, hidden3, output]);

    // myNetwork = new neataptic.architect.LSTM(1, 4, 6, 4, 1);

    var trainingData = []

    for (let i = 0; i < stock.length - 1; i++) {
        var inout = { input: [(stock[i] / stock[stock.length - 1] * 1.6)], output: [stock[i + 1] / (stock[stock.length - 1] * 1.6)] };
        trainingData.push(inout);
    }



    network.train(trainingData, {
        log: 500,
        iterations: 20000,
        error: 0.03,
        clear: true,
        rate: 0.05,
    });

    await network.evolve(trainingData, {
        mutation: neataptic.methods.mutation.ALL,
        mutationRate: 0.4,
        clear: true,
        cost: neataptic.methods.cost.MSE,
        error: 0.03,
        log: 1000,
        iterations: 20000
    }).then(function (res) {
        var results = {
            error: neataptic.methods.cost.mse,
            generations: neataptic.Neat.generation,
            time: Date.now() - neataptic.Neat.start,
            evolved: neataptic.Neat.fittest
        };
        console.log(results);
    });



    for (var i in trainingData) {
        var input = trainingData[i].input;
        var output = network.activate([input]);
        // console.log('Input: ' + (input[0] * 300) + ', output: ' + (output * 300));
    }

    for (var i = 0; i < 1; i++) {
        var input = output;
        var output = network.activate([input]);
        var ultResult = (output * (stock[stock.length - 1] * 1.6));
        console.log(ultResult);
        return ultResult;
        // $(".predict").text(output * (stock[stock.length] * 1.6)).attr("class", "centerHighlight");
    }

}







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
                "volume": [],
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
                        temp.volume.unshift(results[key]['5. volume'])
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

    app.get('/api/portfolio/:id', function(req, res){
        var comp = req.params.id
        for (var i = 0; i < stockData.length; i++) {
            if (stockData[i].company == comp) {
                execute(stockData[i].close).then(function(returned){
                    res.json(returned);
                });
            } 
        }

    });

    app.delete('/api/portfolio/:id', function(req, res){
        var comp = req.params.id
        for (var i = 0; i < stockData.length; i++) {
            if (stockData[i].company == comp) {
                stockData.splice(i, 1)
                res.send(comp + " Data Removed");
            }
        }
    })
};

