const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
router.use(express.json());
dotenv.config()

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
const User = require('../model/userschema')
const Contact = require('../model/contactpage')
const AddBlog = require("../model/Postblog")
const AgricultureUniversity = require("../model/AgricultureUniversitySchema");
const ShoppingPage = require("../model/ShoppingProduct");
const Commentbox = require("../model/commentBox")
const SellerCropData = require("../model/SellCropSchema");
router.get("/AdminAgroAcers362/UserDetails", (req, res) => {

    User.find({}).then((result) => {

        res.send(result)
    })
})
router.post("/makeAdmin", (req, res) => {
 const {id} = req.body;
    User.findByIdAndUpdate(id, { isAdmin:true}, function(err, docs) {
        if (err) {
            console.log("error occured" +err)
        } else {
            console.log("Updated User : " + docs);
        }
    })
})
router.post("/updateBlog", (req, res) => {
 const {id,title,Description,Image} = req.body;
 console.log(id);
    AddBlog.findByIdAndUpdate(id, {title:title,Description:Description,Image:Image}, function(err, docs) {
        if (err) {
            console.log("error occured" +err)
        } else {
            res.status(200).json({msg:"Updated"})
            console.log("Updated Blog : " + docs);
        }
    })
})
router.post("/deleteBlog", (req, res) => {
 const {id} = req.body;
 console.log(id);
    AddBlog.findByIdAndDelete(id, function(err, docs) {
        if (err) {
            console.log("error occured" +err)
        } else {
            res.status(200).json({msg:"deleted"})
            console.log("Deleted : " + docs);
        }
    })

})

router.get("/AdminAgroAcers362/ContactResult", (req, res) => {

    Contact.find({}).then((result) => {

        res.send(result)
    })
})
router.get('/cropdata', (req, res) => {
    AddBlog.find({}).then((result) => {
        // console.log(result);
        res.send(result)
    })

})
router.get('/Sellercropdata', (req, res) => {
    SellerCropData.find({}).then((result) => {
        // console.log(result);
        res.send(result)
    })

})
router.get('/AgricultureUniversityData', (req, res) => {
    AgricultureUniversity.find({}).then((result) => {

        res.send(result)
    })

})
router.get('/CommentData', (req, res) => {
    Commentbox.find({}).then((result) => {

        res.send(result)
    })

})

router.get('/Shopproductdata', (req, res) => {
    ShoppingPage.find({}).then((result) => {
        res.send(result)
    })

})
router.get('/sellerCrop/:id', (req, res) => {
    const id = req.params.id;

    SellerCropData.findOne({ _id: id }).then((product) => {
        if (product) {
            return res.send(product)
        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(404)
    })

})

router.get('/Shopproductdata/:id', (req, res) => {

    const id = req.params.id;

    ShoppingPage.findOne({ _id: id }).then((product) => {
        if (product) {
            return res.send(product)
        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(404)
    })
})
router.get('/CropSellDashboard/myApplication/:id', (req, res) => {

    const id = req.params.id;

    SellerCropData.findOne({ _id: id }).then((product) => {
        if (product) {
            return res.send(product)
        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(404)
    })
})


router.post('/Shopproductcartdata', (req, res) => {

    const { id, quantity } = req.body;

    ShoppingPage.findByIdAndUpdate(id, { quantity: quantity }, function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log("Updated User : " + docs);
        }
    })

})

router.get('/cropdata/:id', (req, res) => {
    const id = req.params.id;

    AddBlog.findOne({ _id: id }).then((product) => {
        if (product) {
            // console.log(product)
            return res.send(product)
        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(404)
    })
})

module.exports = router;