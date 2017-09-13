var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var exec        = require('child_process').exec;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.post('/auto',function(req, res){
    console.log('Message: '+req.body.head_commit.message)
    console.log('repository: '+req.body.repository.name)
    console.log('mane: '+req.body.head_commit.author.name)
    console.log('email: '+req.body.head_commit.author.email)
    console.log('username: '+req.body.head_commit.author.username)
    console.log('pulling code from GitHub...');
    //-------------
    console.log('---------------------reset-----------------');
    exec('git -C \Users\Phuong\Desktop\request reset --hard');
    console.log('---------------------clean-----------------');
    exec('git -C \Users\Phuong\Desktop\request clean -df');
    console.log('----------------------pull-----------------');
    exec('git -C \Users\Phuong\Desktop\request pull -f'+stdout+stderr);
    res.sendStatus(200);
    res.end();
});
app.listen(8080);
function execCallback(err, stdout, stderr) {
	if(stdout) console.log(stdout);
	if(stderr) console.log(stderr);
}