const express       = require('express');
const say           = require('say');
const app           = express();
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
app.listen(8080);
