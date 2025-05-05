const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        unque: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],
        minlength: 6
    }
},{timesstamps:true});
module.exports = mongoose.model("User", userSchema)