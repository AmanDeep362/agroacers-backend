const mongoose = require('mongoose');

const GovtSchemeSchema = mongoose.Schema({

    SchemeName:{
        type : String,
        required: true
    },
    state :{
        type : String,
        required : true
    },
    website : {
        type : String,
        required : true
    },
   Description : {
        type : String,
        required : true
    },
    Imageurl : {
        type : String,
        required : true
    }
})
const GovtScheme = mongoose.model("GOVTSCHEME",GovtSchemeSchema);
module.exports = GovtScheme;