const express     = require("express")
const app         = express()
const orm         = require("orm")
const say         = require("say")
var messageArr=[]
isSpeaking = false
app.listen(8081)
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
        //req.models.message.createAsync({message:req.query.message,createdAt:req.query.createdAt})
        messageArr.push(req.query.message)
        delay(req.query.message)
        res.status(200)
        res.end()
    } 
})
function delay(message){
    setTimeout(function() {
        if(isSpeaking){
            delay(message) 
        } else {   
            talk(messageArr[0])
            messageArr.shift()
        }
    }, 1000)
}
function talk(message){
    isSpeaking = true
    say.speak(message,(err) => {
        if (err) { 
            isSpeaking=false
            return console.error(err)
        }                    
        isSpeaking=false
        console.log('Speak .....'+message)
      }) 
}