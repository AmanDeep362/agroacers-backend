const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const contactemail = require("../utils/contactmail");
dotenv.config();
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

const ContactData = require("../model/contactpage");

router.post("/contactus", (req, res) => {
  try {
    const { name, email, phonenumber, subject, query,time } = req.body;
    if (!name || !email || !phonenumber || !subject || !query) {
      res.json({ msg: "filled are required to fill" });
    } else {
      const newContactData = new ContactData({
        name,
        email,
        phonenumber,
        subject,
        query,
        time
      });
      newContactData
        .save()
        .then(() => {
          res.status(201).json({ msg: "data added succesfuly" });
          contactemail(newContactData.email,newContactData.name)
        })
        .catch((err) => {
          res.json({ msg: "data not added error occured"});
        });
    }
  } catch (error) {
    console.log("error occcured " + error);
  }
});
module.exports = router;
