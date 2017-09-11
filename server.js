const express       = require('express');
const say           = require('say');
const app           = express();
app.get('/', function(req,res) {
    res.writeHead(200);
    message = (req.query && req.query.message) ? req.query.message : ' ';
    say.speak(message);
    res.end(message);
    });
app.listen(8080);
