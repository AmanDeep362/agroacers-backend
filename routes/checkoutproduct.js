const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const shopbuyproduct = require("./../model/checkoutschema");

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established For CheckOut");
    }
);

router.post("/sendcheckoutdatabasic", (req, res) => {
    try {

        const { BuyerName, EmailofBuyer, city, AdressOfBuyer, Pincode, time } = req.body;

        if (!BuyerName || !EmailofBuyer || !city || !AdressOfBuyer || !Pincode || !time) {
            res.json({ msg: "filled are required to fill" });
        } else {
            const shopCheckout = new shopbuyproduct({
                BuyerName,
                EmailofBuyer,
                city,
                AdressOfBuyer,
                Pincode,
                time,
            });
            // console.log(shopCheckout)
            shopCheckout
                .save()
                .then(() => {
                    res.send(shopCheckout);
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

router.post("/sendcheckoutdata", async(req, res) => {
    try {
        const { _id, Nameofproduct, _idofproduct, qtyofproduct, priceofproduct } = req.body;

        if (!_id || !Nameofproduct || !_idofproduct || !qtyofproduct || !priceofproduct) {
            res.status(500).json({ msg: "filled are required to fill" })
        } else {

            const result = await shopbuyproduct.updateMany({ _id: _id }, {
                $push: {
                    buyitem: {
                        Nameofproduct: Nameofproduct,
                        _idofproduct: _idofproduct,
                        qtyofproduct: qtyofproduct,
                        priceofproduct: priceofproduct
                    }
                }
            }).then((res) => {
                console.log("Product confirm " + res);
            }).catch((err) => {
                console.log("error occur " + err);
            })

            res.send(result);
        }

    } catch (error) {
        console.log(error);
    }
})

router.get("/orderdata", (req, res) => {
    shopbuyproduct.find({}).then((result) => {
        res.send(result)
    })
})

router.post('/updatedispatchdetail', (req, res) => {

    const { id } = req.body;

    shopbuyproduct.findByIdAndUpdate(id, { isDispatch: true }, function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log("User Updated ");
            res.sendStatus(200);
        }
    })

})

router.post('/updatedeliverdetail', (req, res) => {

    const { id } = req.body;

    shopbuyproduct.findByIdAndUpdate(id, { isDelivered: true }, function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log("User Updated ");
            res.sendStatus(200);
        }
    })

})

module.exports = router;