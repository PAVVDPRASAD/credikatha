const Repayment = require("../models/Repayment");
const Loan = require("../models/Loan");
const axios = require("axios");

exports.recordRepayment = async (req, res) => {
  try {
    const { loanId, amount } = req.body;

    const loan = await Loan.findById(loanId).populate("customer");
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    const repayment = new Repayment({
      loan: loanId,
      amount,
      paidAt: new Date()
    });
    await repayment.save();

    loan.paidAmount += amount;
    if (loan.paidAmount >= loan.amount) {
      loan.status = "paid";
    }
    await loan.save();

    const webhookUrl = "https://webhook.site/";
    await axios.post(webhookUrl, {
      event: "repayment_made",
      data: {
        loanId: loan._id,
        customer: {
          name: loan.customer.name,
          phone: loan.customer.phone
        },
        amount: repayment.amount,
        paidAt: repayment.paidAt
      }
    });

    res.status(201).json({ message: "Repayment recorded", repayment });
  } catch (error) {
    console.error("Repayment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
