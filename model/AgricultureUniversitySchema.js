const mongoose = require('mongoose');

const AgeiculturUniversitySchema = mongoose.Schema({

    UniversityName:{
        type : String,
        required: true
    },
    adress :{
        type : String,
        required : true
    },
    contact : {
        type : Number,
        required : true
    },
    website : {
        type : String,
        required : true
    },
    emailId : {
        type : String,
        required : true
    },
    Imageurl : {
        type : String,
        required : true
    }
})
const AgeiculturUniversity = mongoose.model("AGRICULTUREUNIVERSITY",AgeiculturUniversitySchema);
module.exports = AgeiculturUniversity;