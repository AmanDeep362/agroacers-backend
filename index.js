const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // Replace * with the specific domain you want to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/contactPage"));
app.use(require("./routes/CommentRoute"));
app.use(require("./routes/SellCropRoute"));
app.use(require("./routes/verifyuser"));
app.use(require("./routes/checkoutproduct"));
app.use(require("./routes/crop-recommend"));

// const data = require('./data/product.json');

app.use(require("./routes/auth"));
app.use(require("./routes/fertilizer"));
app.use(require("./routes/contactPage"));
app.use(require("./admin/adminroute"));
app.use(require("./admin/postBlog"));
app.use(require("./admin/AgricultureUniversit"));
app.use(require("./admin/shopproduct"));
app.use(require("./admin/sendreply"));
app.use(require("./admin/addScheme"));

app.get("/",(req,res)=>{
  res.send("Hello world")
})
// RazorPay Integration
app.use(require("./routes/Razorpay"));

const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log("server is running port No " + PORT);
});
