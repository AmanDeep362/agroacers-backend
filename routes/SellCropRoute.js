const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
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

const SellerData = require("../model/SellCropSchema");

router.post("/SellCrop", (req, res) => {
    try {

        const {
            FarmerName,
            FarmerFatherName,
            EmailOfFarmer,
            ContactNo,
            Gender,
            city,
            State,
            Pincode,
            AdressOfFarmer,
            BankName,
            BankIFSC,
            BankAccountNo,
            AadharNumber,
            dateofbirth,
            AdressOfLand,
            TotalLandinAcers,
            CropVariety,
            SeedUsed,
            DescriptionOfCrop,
            YieldTime,
            HarvestTime,
            ImageOfCrop,
            Min_price,
            Max_price,
            Farmer_id,
            time
        } = req.body;

        if (!FarmerName || !FarmerFatherName ||!dateofbirth|| !EmailOfFarmer || !ContactNo || !Gender || !city || !State || !Pincode || !AdressOfFarmer  || !BankName || !BankIFSC || !BankAccountNo  || !AadharNumber|| !AdressOfLand || !TotalLandinAcers || !CropVariety || !SeedUsed || !DescriptionOfCrop || !YieldTime || !HarvestTime || !ImageOfCrop || !Min_price, !Max_price||!Farmer_id||!time) {
            console.log("Data Added losse Success")
            return res.sendStatus(201);
        } else {
            console.log("Data Added Success in  progress")

            const newFarmerCrop = new SellerData({
                FarmerName,
                FarmerFatherName,
                EmailOfFarmer,
                ContactNo,
                Gender,
                city,
                State,
                Pincode,
                AdressOfFarmer,
                BankName,
                BankIFSC,
                BankAccountNo,
                AadharNumber,
                AdressOfLand,
                TotalLandinAcers,
                CropVariety,
                SeedUsed,
                dateofbirth,
                DescriptionOfCrop,
                YieldTime,
                HarvestTime,
                ImageOfCrop,
                Min_price,
                Max_price,
                Farmer_id,
                time
            });

            newFarmerCrop.save().then(() => {
                    res.status(200).json({ msg: "data added succesfuly" });
                })
                .catch((err) => {
                    res.json({ msg: "data not added error occured" });
                    console.log(err);
                });
        }
    } catch (error) {
        console.log("error occcured " + error);
    }
});

router.get('/SellCropdata', (req, res) => {
    SellerData.find({}).then((result) => {
        res.send(result)
    })

})


module.exports = router;