const Loan = require("../models/Loan");
const moment = require("moment");

// Create a loan
exports.createLoan = async (req, res) => {
  try {
    const { customer, amount, dueDate } = req.body;

    const loan = new Loan({
      user: req.user._id,
      customer,
      amount,
      dueDate
    });

    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: "Failed to create loan" });
  }
};

// Get all loans for user (with optional status filter)
exports.getLoans = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { user: req.user._id };
    if (status) filter.status = status;

    const loans = await Loan.find(filter).populate("customer", "name phone");

    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch loans" });
  }
};

// Update loan status (auto-tag overdue)
exports.autoUpdateLoanStatus = async () => {
  const loans = await Loan.find({ status: "pending" });
  const today = moment();

  for (const loan of loans) {
    const due = moment(loan.dueDate);
    if (today.isAfter(due)) {
      loan.status = "overdue";
      await loan.save();
    }
  }
};
