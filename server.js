var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");


var app = express();
var PORT = process.env.PORT || 8081;

app.use(express.static(__dirname + '/app'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(bodyParser.text({ type: 'text/html' }));


var apiRoutes = require("./app/routing/apiRoutes")(app);

app.get("/", function (req, res) {
    fs.readFile('./app/public/home.html', function(error, content) {
        if (error) {
            res.writeHead(500);
            res.end();
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
    // res.sendFile(path.join(__dirname, "/app/public/home.html"));
});


app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
