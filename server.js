var express     = require('express')
var app         = express()
var say         = require('say')
var mongoose    = require('mongoose')
var database    = require('./database')
database.connect('mongodb://localhost/mytestdata')
app.get('/', function(req,res) {
    var message = req.query.message
    var createdAt = req.query.createdAt
    if (createdAt ==null || createdAt == ''|| message == null || message == '') {
        res.status(404)
        res.end()
    } else {
        database.add(message,createdAt)
        say.speak(message);
        res.status(200)
        res.end()
    }
});
app.listen(8080)