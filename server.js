var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var exec        = require('child_process').exec;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/',function(req,res){
    res.send('Xin Chao 2');
})
app.post('/auto',function(req, res){
   // if(req.body=='' ||req.body== null){
       Console.log(req.body)
        console.log('name: '+req.body['head_commit']['author']['name'])
        console.log('message: '+req.body['head_commit']['message'])
        exec('git -C /home/tuantruong/git/request pull -f')
        res.sendStatus(200);
        res.end();//}
   // else{
      //  res.status(500)
      //  res.end();}
   
});
app.listen(8080);
