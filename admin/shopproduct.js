const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established for Shop Product");
    }
);


const ShoppingPage = require("../model/ShoppingProduct");

router.post("/admin/AddShopproduct", (req, res) => {
    try {

        const { Hindi_name, Name, Description, new_price, old_price, quantity, category, Imageurl } = req.body;

        if (!Hindi_name || !Name || !Description || !new_price || !old_price || !quantity || !category || !Imageurl) {
            res.json({ msg: "filled are required to fill" });
        } else {
            const ShoppingProductData = new ShoppingPage({
                Hindi_name,
                Name,
                Description,
                new_price,
                old_price,
                quantity,
                category,
                Imageurl
            });
            // console.log(ShoppingProductData)
            ShoppingProductData
                .save()
                .then(() => {
                    res.status(200).json({ msg: "data added succesfuly" });
                })
                .catch((err) => {
                    console.log(err);
                    res.json({ msg: "data not added error occured" });
                });
        }
    } catch (error) {
        console.log("error occcured " + error);
    }
});
module.exports = router;