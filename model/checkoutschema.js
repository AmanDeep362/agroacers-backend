const mongoose = require('mongoose');

const Shopcheckout = mongoose.Schema({

    BuyerName: {
        type: String,
        required: true
    },
    EmailofBuyer: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    AdressOfBuyer: {
        type: String,
        required: true
    },
    Pincode: {
        type: Number,
        required: true
    },
    isDispatch: {
        type: Boolean,
        default: false
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    time: {
        type: String,
        required: true
    },
    buyitem: [{
        Nameofproduct: {
            type: String,
        },
        _idofproduct: {
            type: String,
        },
        qtyofproduct: {
            type: Number,
        },
        priceofproduct: {
            type: Number,
        },
    }]
})
const shopbuyproduct = mongoose.model("BUYPRODUCT", Shopcheckout);
module.exports = shopbuyproduct;