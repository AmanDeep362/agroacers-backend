const mongoose = require('mongoose');

const SellCropSchema = mongoose.Schema({

    FarmerName: {
        type: String,
        required: true
    },
    FarmerFatherName: {
        type: String,
        required: true
    },
    EmailOfFarmer: {
        type: String,
        required: true
    },
    ContactNo: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Pincode: {
        type: Number,
        required: true
    },
    AdressOfFarmer: {
        type: String,
        required: true
    },
    BankName :{
        type: String,
        required: true
    },
    BankIFSC :{
        type: String,
        required: true
    },
    BankAccountNo :{
        type: Number,
        required: true
    },
    AadharNumber :{
        type: Number,
        required: true,
    },
    dateofbirth :{
        type: String,
        required: true
    },
    AdressOfLand: {
        type: String,
        required: true
    },
    TotalLandinAcers: {
        type: Number,
        required: true,
    },
    CropVariety: {
        type: String,
        required: true
    },
    SeedUsed: {
        type: String,
        required: true
    },
    DescriptionOfCrop: {
        type: String,
        required: true
    },
    YieldTime: {
        type: String,
        required: true
    },
    HarvestTime: {
        type: String,
        required: true
    },
    ImageOfCrop: {
        type: String,
        required: true
    },
    Min_price: {
        type: Number,
        required: true
    },
    Max_price: {
        type: Number,
        required: true
    },
    Farmer_id: {
        type : String,
        required: true
    },
    time:{
        type : String,
        required: true
    },
    bid_by: [{
        nameOfOrg:{
        type : String,
       },
       emailoforg:{
        type : String,
       },
       contactoforg:{
        type : Number,
       },
       intrestoforg:{
        type : String,
       },
       bidprice:{
        type : Number,
       },
    }]
})
const FarmerCrop = mongoose.model("FARMERCROP", SellCropSchema);
module.exports = FarmerCrop;