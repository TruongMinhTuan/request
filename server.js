var express     = require("express")
var app         = express()
var orm         = require("orm")
var say         = require('say')
app.listen(8080)
app.use(orm.express('mysql://root:root@localhost/mytestdata', {
    define: function (db, models, next) {
        models.message = db.define("messages", { 
            message:String,
            createdAt:String
        })
        next()
    }
}))
app.get('/', function(req,res) {
    if (req.query.createdAt ==null || req.query.createdAt== ''|| req.query.message == null || req.query.message == '') {
        res.status(404)
        res.end()
    } else {
        req.models.message.createAsync({message:req.query.message,createdAt:req.query.createdAt})
        say.speak(req.query.message)
        res.status(200)
        res.end()
    } 
})



