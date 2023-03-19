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

const GovtScheme = require("../model/GovtSheme");

router.post("/admin/GovtScheme", (req, res) => {
  try {
    const { SchemeName, state, website, Description, Imageurl } = req.body;
    if (!SchemeName || !state || !website || !Description || !Imageurl) {
      res.json({ msg: "filled are required to fill" });
    } else {
      const GovtSchemeData = new GovtScheme({
        SchemeName,
        state,
        website,
        Description,
        Imageurl,
      });
     GovtSchemeData.save()
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
router.get('/GovtSchemeData', (req, res) => {
  GovtScheme.find({}).then((result) => {

      res.send(result)
  })

})
module.exports = router;
