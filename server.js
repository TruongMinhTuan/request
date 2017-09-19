var express     = require('express');
var app         = express();
var say         = require('say');
app.get('/', function(req,res) {
    message = req.query.message;
    if (message == null || message == ''){
        res.status(404)
        res.end();
    } else {
        res.status(200)
        say.speak(message,'rab_diphone',1);//kal_diphone ,rab_diphone
        res.end();
    }
});
app.listen(8080);
