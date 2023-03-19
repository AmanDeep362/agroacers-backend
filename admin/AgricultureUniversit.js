const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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


const AgeiculturUniversity = require("../model/AgricultureUniversitySchema");

router.post("/admin/AgricultureUniversity", (req, res) => {
  try {
    const {UniversityName,adress,contact,website,emailId,Imageurl} = req.body;
    if ( !UniversityName || !adress || !contact || !website || !emailId || !Imageurl) {
      res.json({ msg: "filled are required to fill" });
    } else {
      const AgeiculturUniversityData = new AgeiculturUniversity({
        UniversityName,
        adress,
        contact,
        website,
        emailId,
        Imageurl
      });
      AgeiculturUniversityData
        .save()
        .then(() => {
          res.status(201).json({ msg: "data added succesfuly" });
        })
        .catch((err) => {
          res.json({ msg: "data not added error occured" });
        });
    }
  } catch (error) {
    console.log("error occcured " + error);
  }
});
module.exports = router;
