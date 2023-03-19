const mongoose = require("mongoose");

const CommentBoxSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    commentOnCrop :{
        type: String,
        required: true,
    },
    CommentMsg: {
        type: String,
        required: true,
    },
    // NoOfLikes: {
    //     type: Number,
    // },
    // NoOfDislike: {
    //     type: Number,
    // },
    // reply :[
    //     {
    //       authorName:{
    //         type: String
    //       },
    //       ReplyMsg:{
    //         type: String
    //       },
    //       timeOfreply:{
    //         type: String
    //       }
    //     }
    // ],
    time: {
        type: String,
        required: true,
    }
})
const CommentBox = mongoose.model("COMMENTBOX", CommentBoxSchema);
module.exports = CommentBox;