var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var exec        = require('child_process').exec;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/',function(req,res){
    res.send('Xin Chao 23');
})
app.post('/auto',function(req, res){
    console.log('name: '+req.body['head_commit']['author']['name'])
   // console.log('email: '+req.body['head_commit']['author']['email'])
   // console.log('username: '+req.body['head_commit']['author']['username'])
    console.log('message: '+req.body['head_commit']['message'])
    //console.log('repository: '+req.body['repository']['name'])
    
    //exec('git -C /home/tuantruong/git/request reset --hard', execCallback);
    //exec('git -C /home/tuantruong/git/request clean -df')//, execCallback);
    exec('git -C /home/tuantruong/git/request pull -f')//, execCallback);
   // console.log('pulling code from GitHub...');
    res.sendStatus(200);
    res.end();
});
app.listen(8080);
// function execCallback(err, stdout, stderr) {
// 	if(stdout) console.log(stdout);
// 	if(stderr) console.log(stderr);
// }