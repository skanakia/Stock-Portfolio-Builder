var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");


var app = express();
var PORT = process.env.PORT || 8080;

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


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.static(__dirname + '/app'));


app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
