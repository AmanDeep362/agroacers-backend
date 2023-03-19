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

const PostData = require("../model/Postblog");

router.post("/admin/Postblog", (req, res) => {
  try {
    const {title, Image, Description, Author, UserId,time,category} = req.body;
    if (!title || !Image || !Description || !category) {
      res.json({ msg: "filled are required to fill" });
    } else {
      const newContactData = new PostData({
        title,
        Image,
        Description,
        Author,
        UserId,
        time,
        category
      });
      newContactData
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
