const mongoose = require("mongoose");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    state: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSubscriber: {
        type: Boolean,
        default: false
    },
    NoOfBids: {
        type: Number,
        default: 0
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});


userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bycrypt.hash(this.password, 12);
        this.cpassword = await bycrypt.hash(this.cpassword, 12);
    }
    next();
})


userSchema.methods
    .generateAuthToken = async function() {
        try {
            let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({ token: token })
            await this.save()
            return token;
        } catch (err) {
            console.log(err);
        }
    }

const User = mongoose.model("USER", userSchema)
module.exports = User;