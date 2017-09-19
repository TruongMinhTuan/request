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
        say.speak(message,'voice_hy_fi_mv_diphone',1);//2-coicehy_fi_mv_diphone,1-voice_kal_diphone ,voice_rab_diphone ,voice_lp_diphone,voice_lp_diphone
        res.end();
    }
});
app.listen(8080);
