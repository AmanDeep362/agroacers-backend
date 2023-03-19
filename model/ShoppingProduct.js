const mongoose = require("mongoose");

const shoppingPageSchema = mongoose.Schema({
    Hindi_name: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    Imageurl: {
        type: String,
        required: true,
    },
})

const ShoppingPage = mongoose.model("SHOPPINGPAGE", shoppingPageSchema);
module.exports = ShoppingPage;