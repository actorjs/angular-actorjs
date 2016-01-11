var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + "/src"));
app.use(express.static(__dirname + "/examples"));
app.use(express.static(__dirname + "/dist"));
app.use("/lib", express.static( __dirname + '/../bower_components'));

app.use(bodyParser.json());

var events = [];

app.get("/events", function(req, res){
    var id = req.query.id;
    var list = events.filter(function(event){
        return event.id === id
    });
    console.log("GET /events:", id, JSON.stringify(list, null ,4));
    res.send(list);
});

app.post("/events", function(req, res){
    var event = req.body;
    event.date = new Date();
    events.push(event);
    console.log("POST /events:",event.id, JSON.stringify(req.body, null ,4));
    res.send();
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});