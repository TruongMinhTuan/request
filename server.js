const express       = require('express');
const say           = require('say');
const app           = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/',function(req,res) {
        if (req.query.message == null){
            res.status(404)
            res.end();
        }
        else if(req.query.message == ''){ 
            res.status(500)
            res.end();
        }
        else{
            say.speak(req.query.message);
            res.end();
        }        
    });    
app.post('/auto', function (req, res) {	
	console.log(req.body.pusher.name + ' just pushed to ' + req.body.repository.name);
	console.log('pulling code from GitHub...');
	//exec('git ~/Desktop/wackcoon-hook-master/wackcoon-hook-master reset --hard', execCallback);
    res.sendStatus(200);
    res.end();
});
app.listen(8080);
