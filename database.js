const mongoose      =require('mongoose')
const messageChema =new mongoose.Schema({
    message: String,
    createdAt:String
})
const messageModel = mongoose.model('message',messageChema)
module.exports = {
    connect: function (url){
        mongoose.connect(url,{
            useMongoClient: true,
        });
    },
    add: function(message,createdAt) {
        messageModel.create({
            message :message,
            createdAt :createdAt
        })
    },
    show:function() {
        messageModel.find().exec((err,result)=> {
            for(i=0;i<result.length;i++)
                console.log('no:'+i+' createAt: '+result[i].createdAt+'message: '+result[i].message)
        })
    }
};


