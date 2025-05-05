const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: [true, "Customer name is required"]
  },
  phone: {
    type: String,
    required: true,
    validate: [validator.isMobilePhone, "Enter valid phone number"]
  },
  trustScore: {
    type: Number,
    default: 5,
    min: 1,
    max: 10
  }
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
