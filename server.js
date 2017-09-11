const express       = require('express');
const say           = require('say');
const app           = express();
app.get('/', function(req,res) {
        if (req.query.message == null || req.query.message == '') 
        {
            res.status(404)
            res.end();
        }
      else
        { 
            res.status(200)
            say.speak(req.query.message);
            res.end();
        }        
    });
app.listen(8080);
