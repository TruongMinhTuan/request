var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var exec        = require('child_process').exec;
var say         = require('say');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/', function(req,res) {
    message=req.query.message;
    if (message == null || message == ''){
        res.status(404)
        res.end();
    }else{
        res.status(200)
        say.speak(message);
        res.end();
    }
});
app.post('/auto',function(req, res){
    //console.log('name: '+req.body['head_commit']['author']['name'])
   // console.log('message: '+req.body['head_commit']['message'])
    var cmd = "echo 'hello world'";
    
    var options = {
      encoding: 'utf8'
    };
    
    console.log(exec(cmd, options));
    exec('git pull -f') 
    res.sendStatus(200);
    res.end();    
});
app.listen(8080);
