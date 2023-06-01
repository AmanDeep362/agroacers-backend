const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
router.use(express.json());
const mandiData = require('../data/data.json')
const Authentication = require('../middleware/authentication')
var cookieParser = require('cookie-parser');
router.use(cookieParser());
dotenv.config();

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
const User = require("../model/userschema");
const sendEmail = require('../utils/sendEmail');


router.post("/verifyregisteremail", (req, res) => {
    const { name, email } = req.body;
    console.log(name);

    if (!name || !email) {
        return res.sendStatus(201);
    }

    User.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                return res.sendStatus(202);
            } else {
                res.status(200).json({ msg: "Registration Successful" });
            }
        }).catch((err) => {
            console.log(err)
        })
})

router.post("/verifyregisternumber", (req, res) => {
    const { name, number } = req.body;
    console.log(name);

    if (!name || !number) {
        return res.sendStatus(201);
    }

    User.findOne({ number: number })
        .then((existingUser) => {
            if (existingUser) {
                return res.sendStatus(202);
            } else {
                res.status(200).json({ msg: "Registration Successful" });
            }
        }).catch((err) => {
            console.log(err)
        })
})

router.post("/register", (req, res) => {
    const { name, email, state, number, password, cpassword, time } = req.body;
    console.log(name);

    if (!name || !email || !number || !password || !cpassword) {
        return res.sendStatus(201);
    }

    User.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                return res.sendStatus(422);
            }
            const user = new User({ name, email, state, number, password, cpassword, time });
            user.save().then(() => {
                res.status(200).json({ msg: "Registration Successful" });
                sendEmail(user.email, user.name)
            }).catch((err) => {
                res.status(501).json({ msg: "Failed to Register" })
            })
        }).catch((err) => {
            console.log(err)
        })
})

//Change The Password
router.post("/setnewpassword", (req, res) => {
    const { email, password, cpassword } = req.body;

    console.log(email, password, cpassword)

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "User dont exists with that email" })
            }
            user.password = password
            user.cpassword = cpassword
            user.save().then(() => {
                res.json({ message: "password updated success" })
            })
        }).catch(err => {
            console.log(err)
        })
})

//mandidata
router.get('/data', (req, res) => {
    res.send(mandiData);
})

//login
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bycrypt.compare(password, userLogin.password)
            const token = await userLogin.generateAuthToken();
            
            res.cookie("jwtToken", token, {
                expires: new Date(2147483647 * 1000),
                httpOnly: true
            })

            if (!isMatch) {
                return res.status(401).json({ msg: "Invalid Credential" });
            } else {
                res.status(200).json({ msg: "login Succesfully", user:userLogin })
            }
        } else {
            return res.status(402).json({ msg: "Invalid Credential" });
        }
    } catch (err) {
        res.json({ msg: "error occured" })
    }
})

router.get('/aboutuser/:id',  async(req, res) => {
    
        const id = req.params.id;
      await User.findOne({_id:id}).findOne({ _id: id }).then((product) => {
        if (product) {
            return res.send(product)
        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(404)
    })
     
   
  });
router.get('/logout', (req, res) => {
    res.clearCookie('jwtToken')
    res.status(200).send('user logout');
    console.log("logout")

});



module.exports = router;