const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
router.use(express.json());
dotenv.config();
const sendEmailverification = require("../utils/emailverify");
const passwordchangeverify = require("../utils/changepassword");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const service = process.env.TWILIO_AUTH_SERVICE;
const client = require('twilio')(accountSid, authToken);


router.post("/sendverifyemailtochnagepassword", (req, res) => {
    const { email, OTP } = req.body;
    console.log(OTP);

    if (OTP) {
        passwordchangeverify(email, OTP);
        res.status(200).send({
            message: "Verification Email is sent!!",
        })
    } else {
        res.status(400).send({
            message: "Wrong email id:(",
            data
        })
    }
})

router.post("/sendverifyemail", (req, res) => {
    const { name, email, OTP } = req.body;
    console.log(name, OTP);

    if (OTP) {
        sendEmailverification(email, name, OTP);
        res.status(200).send({
            message: "Verification Email is sent!!",
        })
    } else {
        res.status(400).send({
            message: "Wrong email id:(",
            data
        })
    }
})

router.post("/sendverifynumber", (req, res) => {
    const { name, number } = req.body;
    console.log(name);

    if (number) {
        client
            .verify
            .services(service)
            .verifications
            .create({
                to: `+91${number}`,
                channel: 'sms'
            })
            .then(data => {
                res.status(200).send({
                    message: "Verification is sent!!",
                    phonenumber: number,
                    data
                })
            })
    } else {
        res.status(400).send({
            message: "Wrong email id:(",
            data
        })
    }
})

// Verify Endpoint
router.post('/verifynumber', (req, res) => {
    const { number, OTP } = req.body;
    if (number && (OTP).length === 6) {
        client
            .verify
            .services(service)
            .verificationChecks
            .create({
                to: `+91${number}`,
                code: OTP
            })
            .then(data => {
                if (data.status === "approved") {
                    console.log("Number OTP is verified")
                    res.status(200).send({
                        message: "User is Verified!!",
                        data
                    })
                } else if (data.status === "pending") {
                    console.log("Number OTP is invalid")
                    res.status(400).send({
                        message: "User otp invalid!!",
                        data
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
    } else {
        res.status(400).send({
            message: "Wrong phone number or code :(",
            phonenumber: req.query.phonenumber,
            data
        })
    }
})


module.exports = router;