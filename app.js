var express     = require("express")
var app         = express()
var orm         = require("orm")
var say         = require("say")
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
var temp={ }
temp.Date=[]
temp.Date[0]=Date.now()
var time=1
var timeSpeaker=0
app.use(function (req, res, next) {
     temp.Date.push(Date.now())
         if(temp.Date[temp.Date.length-1]-temp.Date[temp.Date.length-2]<10000) {
            sayMessage(() => { },time*5000,req.query.message+'')
            temp.Date.splice(1)
            temp.Date[0]=Date.now()
            console.log(req.query.message)
            timeSpeaker=temp.Date[0]+(time*5000)
            time++ 
        } else {
            if ( time>1 ) {
                if(temp.Date[temp.Date.length-1]<timeSpeaker+1000){
                    sayMessage(() => { },time*5000,req.query.message+'')
                 console.log(req.query.message)
                } else {
                    sayMessage(() => { },0,req.query.message+'')
                    time=1
                    console.log(req.query.message)
                }
            } else { 
                temp.Date.shift()
                say.speak(req.query.message)
                sayMessage(() => { },0,req.query.message+'')
                time=1
                console.log(req.query.message)
                }             
        }
        res.end()
})
app.get('/', function(req,res) {
    if (req.query.createdAt ==null || req.query.createdAt== ''|| req.query.message == null || req.query.message == '') {
        res.status(404)
        res.end()
    } else {
        //req.models.message.createAsync({message:req.query.message,createdAt:req.query.createdAt})
        say.speak(req.query.message)
        res.send(req.query.message +req.query.createdAt)
        res.status(200)
        res.end()
    }
})

var express     = require("express")
var app         = express()
var orm         = require("orm")
var say         = require("say")
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
        res.send(req.query.message +req.query.createdAt)
        res.status(200)
        res.end()
    }
})
function sayMessage(callback, time,mess) {
    setTimeout(function() {
        say.speak(mess)
    }, time)
}