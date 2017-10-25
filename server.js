const express     = require("express")
const app         = express()
const orm         = require("orm")
const say         = require("say")

let messageCount = 0
let isSpeaking = false

app.listen(8080)
//app.use(orm.express('mysql://root:root@localhost/mytestdata', {
app.use(orm.express('mongodb://0.0.0.0/mytestdata', {
    define: function (db, models, next) {
        models.message = db.define("messages", {
            message: String,
            createdAt: Date
        })
        next()
    }
}))

app.get('/', function(req,res) {
    if (req.query.message == null || req.query.message == '') {
        res.status(400)
        res.end()
    } else {
        req.models.message.createAsync(
            {
                message:req.query.message,
                createdAt:req.query.createdAt
            },
            function(err) {
                if (err) throw err 
            }
        )
        messageCount++
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
            if(messageCount == 1)
            talk('you had '+ messageCount +' order')
            else
            talk('you had '+ messageCount +' orders')
            messageCount = 0
        }
    }, 1000)
}

function talk(message) {
    if(messageCount!=0) {
        isSpeaking = true//cmu_us_clb_arctic_clunits//cmu_us_bdl_arctic_clunits
        say.speak(message,'voice_cmu_us_bdl_arctic_clunits', 1, (err) => {
            if (err) {
                isSpeaking = false
                return console.log(err)
            }
            isSpeaking = false
            console.log('Speak .....' + message+ ' now')
        })
    }
}
