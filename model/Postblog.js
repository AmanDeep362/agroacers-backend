const mongoose = require("mongoose");

const PostBlogSchema = mongoose.Schema({
   title: {
        type: String,
        required: true,
      },
      Image: {
        type: String,
        required: true,
      },
     Description: {
        type: String,
        required: true,
      },
     Author : {
        type: String,
        required: true,
      },
      UserId: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      category : {
        type : String,
        required : true 
      }
})
const AddBlog = mongoose.model("POSTBLOG" , PostBlogSchema);
module.exports = AddBlog;