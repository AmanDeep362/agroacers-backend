const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const sendmsgtofarmer = require("../utils/SendmailFarmer")
const sendbidmsg = require("../utils/sentbidmsg");
const cartmail = require("../utils/cartmail");
const sendReplyMsg = require("../utils/sendReplyMsg")
dotenv.config();
const UserInfo = require("../model/userschema");
const farmercrops = require("../model/SellCropSchema");
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    }
);

router.post("/sendReply", (req, res) => {
    try {
        const { name, mail, subject, body } = req.body;
        sendReplyMsg(mail, name, subject, body).then(() => {
            res.status(201).json({ msg: "mail sent Succesfully" })
        }).catch((err) => {
            res.status(400).json({ msg: "error occured" })
        })

    } catch (error) {
        console.log(error);
    }
})
router.post("/sendMessagetofarmer", (req, res) => {
    try {
        const { name, email, contact, company, body, Farmername, Farmeremail } = req.body;
        sendmsgtofarmer(name, email, contact, company, body, Farmername, Farmeremail).then(() => {
            res.status(200).json({ msg: "mail sent Succesfully" })
        }).catch((err) => {
            res.status(400).json({ msg: "error occured" })
        })

    } catch (error) {
        console.log(error);
    }
})

router.post("/sendbid", (req, res) => {
    try {
        const { nameOfOrg, emailoforg, contactoforg, intrestoforg, cropname, farmername, bidprice, farmeremail, UserId ,CropId} = req.body;

        if (!nameOfOrg || !emailoforg || !contactoforg || !intrestoforg || !cropname || !farmername || !bidprice || !farmeremail || !CropId ) {
            res.status(500).json({ msg: "filled are required to fill" })
        } else {
            sendbidmsg(nameOfOrg, emailoforg, contactoforg, intrestoforg, cropname, farmername, bidprice, farmeremail).then(() => {
                res.status(201).json({ msg: "mail sent Succesfully" })
            }).catch((err) => {
                res.status(400).json({ msg: "error occured" })
            })
            console.log(CropId);
            farmercrops.updateMany({_id:CropId},{$push:{bid_by:{nameOfOrg:nameOfOrg,emailoforg:emailoforg,contactoforg:contactoforg,intrestoforg:intrestoforg,bidprice:bidprice}}}).then((res)=>{
             console.log("confirm"+res);
            }).catch((err)=>{
                console.log("error occur"+err);
            })
            UserInfo.findByIdAndUpdate(UserId, { $inc: { NoOfBids: -1 } }, function(err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Updated User : " + docs);
                }
            })
        }

    } catch (error) {
        console.log(error);
    }
})
const shoppingProduct = require("../model/ShoppingProduct")
router.post("/sendcartReply", (req, res) => {
    try {
        const { name, mail, orderid, transid, amountpay, productid } = req.body;
        cartmail(mail, name, orderid, transid, amountpay).then(() => {
            res.status(201).json({ msg: "mail sent Succesfully" })
            shoppingProduct.findByIdAndUpdate(productid, { $inc: { quantity: -1 } }, function(err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Updated User : " + docs);
                }
            })
        }).catch((err) => {
            res.status(400).json({ msg: "error occured" })
        })

    } catch (error) {
        console.log(error);
    }
})



const Subscribermail = require("../utils/subscriberemail");
const sendReplymsg = require("../utils/sendReplyMsg");

router.post("/sendSubscription", (req, res) => {
    try {

        const { name, mail, orderid, transid, amountpay, UserId } = req.body;
        console.log(UserId);
        UserInfo.findByIdAndUpdate(UserId, { isSubscriber: true }, function(err, docs) {
            if (err) {
                console.log(err)
            } else {
                console.log("Updated User : " + docs);
            }
        })
        UserInfo.findByIdAndUpdate(UserId, { NoOfBids: 60 }, function(err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Updated User : " + docs);
                }
            })
            // cartmail(mail, name, orderid, transid, amountpay).then(() => {
            //     res.status(201).json({ msg: "mail sent Succesfully" })
            // }).catch((err) => {
            //     res.status(400).json({ msg: "error occured" })
            // })

        Subscribermail(mail, name, orderid, transid, amountpay);
        res.status(201).json({ msg: "mail sent Succesfully" })
    } catch (error) {
        console.log(error);
    }

})
module.exports = router;