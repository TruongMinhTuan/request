var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var exec        = require('child_process').exec;
var say         = require('say');
//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());
app.get('/', function(req,res) {
    message = req.query.message;
    if (message == null || message == ''){
        res.status(404)
        res.end();
    } else {
        res.status(200)
        say.speak(message,'rab_diphone',0.5);//kal_diphone
        res.end();
    }
});

// Do not touch this, this will be used for continious development
// app.post('/auto',function(req, res){
//     console.log('name: '+req.body['head_commit']['author']['name'])
//     console.log('message: '+req.body['head_commit']['message'])
//     exec("cd ~/request && git pull -f", puts)   
//     res.sendStatus(200);
//     res.end();    
// });
app.listen(8080);

// function puts(error, stdout, stderr) { 
//     if (stdout) 
//         console.log(stdout);
//     if (stderr) 
//         console.log(stderr); 
// }
