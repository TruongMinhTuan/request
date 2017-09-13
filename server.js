var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
//var exec        = require('child_process').exec;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/auto', function (req, res) {	
    console.log(req.body.head_commit.author.name)
    console.log(req.body.head_commit.author.email)
    console.log(req.body.head_commit.author.username)
	console.log('pulling code from GitHub...');
	res.sendStatus(200);
    res.end();
});
app.listen(8080);
