const mongoose = require("mongoose");

const repaymentSchema = new mongoose.Schema({
  loan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loan",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paidAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Repayment", repaymentSchema);
