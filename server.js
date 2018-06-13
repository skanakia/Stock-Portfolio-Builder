var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");



var app = express();
var PORT = process.env.PORT || 8080;


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var apiRoutes = require("./app/routing/apiRoutes")(app);
// var htmlRoutes = require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
