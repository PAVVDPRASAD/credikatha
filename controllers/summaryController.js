const Loan = require("../models/Loan");
const Repayment = require("../models/Repayment");
const moment = require("moment");

exports.getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const loans = await Loan.find({ user: userId });
    const repayments = await Repayment.find({}).populate("loan");

    const totalLoaned = loans.reduce((acc, l) => acc + l.amount, 0);
    const totalCollected = loans.reduce((acc, l) => acc + l.paidAmount, 0);
    const overdueAmount = loans
      .filter(l => l.status === "overdue")
      .reduce((acc, l) => acc + (l.amount - l.paidAmount), 0);

    let totalTime = 0;
    let count = 0;

    for (const repayment of repayments) {
      if (repayment.loan && repayment.loan.user.toString() === userId.toString()) {
        const loanDate = moment(repayment.loan.createdAt);
        const paidDate = moment(repayment.paidAt);
        totalTime += paidDate.diff(loanDate, "days");
        count++;
      }
    }

    const avgRepaymentTime = count ? (totalTime / count).toFixed(2) : 0;

    res.json({
      totalLoaned,
      totalCollected,
      overdueAmount,
      avgRepaymentTime: `${avgRepaymentTime} days`
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate summary" });
  }
};
