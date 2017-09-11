const express       = require('express');
const say           = require('say');
const app           = express();
app.get('/', function(req, res) {
    res.writeHead(200, {
        "Context-type" : "text/html"          
        });
    message = (req.query && req.query.message) ? req.query.message : 'no request';
    say.speak(message);
    res.end( message);
    
});
app.listen(8080);
