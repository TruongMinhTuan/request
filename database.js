const mongoose      =require('mongoose')
const messageChema =new mongoose.Schema({
    message: String,
    createdAt:String
})
const messageModel = mongoose.model('message',messageChema)
module.exports = {
    connect: function (url){
        var db = mongoose.connect(url, {
            useMongoClient: true,
        });
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    },
    add: function(message,createdAt) {
        new messageModel({
            message: message,
            createdAt :createdAt 
        }).save()
    },
    // show:function() {
    //     messageModel.find().exec((err,result)=> {
    //         for(i=0;i<result.length;i++)
    //             console.log('no:'+ i +' createAt: ' + result[i].createdAt + 'message: ' + result[i].message)
    //     })
    // }
};


