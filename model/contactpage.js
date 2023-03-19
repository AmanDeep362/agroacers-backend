const mongoose = require("mongoose");

const contactPageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    query: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    }
})
const contactPage = mongoose.model("CONTACTPAGE", contactPageSchema);
module.exports = contactPage;