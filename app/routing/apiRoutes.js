var path = require("path");
var stockData = require("../data/data.js");
var express = require("express");

module.exports = function (app) {

    
    app.get('/api/portfolio', function (req, res) {
        res.json(stockData);
    });

    var temp = {}

    app.post('/api/portfolio', function (req, res) {
        console.log(req.body);
      
    });
};

