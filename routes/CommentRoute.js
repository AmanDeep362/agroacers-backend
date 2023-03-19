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

const CommentBox = require("../model/commentBox");

router.post("/commentBox", (req, res) => {
  try {
    const { Username,commentOnCrop,CommentMsg,time } = req.body;
    if (!CommentMsg) {
      res.json({ msg: "filled are required to fill" });
    } else {
      const newComment = new CommentBox({
        Username,
        commentOnCrop,
        CommentMsg,
        time 
      });
      newComment
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
