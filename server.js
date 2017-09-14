var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var exec        = require('child_process').exec;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.post('/auto',function(req, res){
    //console.log(JSON.stringify(req.body))
    console.log('name: '+req.body['head_commit']['author']['name'])
    //console.log('mane: '+req.body.head_commit.author.name)
    console.log('email: '+req.body['head_commit']['author']['email'])
    console.log('username: '+req.body['head_commit']['author']['username'])
    console.log('message: '+req.body['head_commit']['message'])
    console.log('repository: '+req.body['repository']['name'])
    console.log('pulling code from GitHub...');
    //-------------
 //   console.log('---------------------reset-----------------');
    exec('git -C \Users\Phuong\Desktop\request reset --hard');
  //  console.log('---------------------clean-----------------');
    exec('git -C \Users\Phuong\Desktop\request clean -df');
    console.log('----------------------pull-----------------');
    exec('git -C \Users\Phuong\Desktop\request pull -f');
    execCallback();
    res.sendStatus(200);
    res.end();
});
app.listen(8080);
