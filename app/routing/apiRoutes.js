var path = require("path");
var friendList = require("../data/data.js");



module.exports = function(app){

    app.get('/api/portfolio', function(req, res){
        res.json(data);
    });

    // app.get('/assets/images/Stock-Market2.jpg', function(req, res){
    //     res.sendFile(path.join(__dirname, "../assets/images/Stock-Market2.jpg"));
    // });

    // app.post("/api/portfolio", function(req, res) {
        
    // });
};

