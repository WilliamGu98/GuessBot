var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var port = 3000;

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Start server
app.listen(port, function() {
    console.log("RESTful API server listening on port: " + port);
});


module.exports = app; //export for testing
