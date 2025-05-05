const Loan = require("../models/Loan");
const Customer = require("../models/Customer");
const moment = require("moment");

exports.getOverdueCustomers = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = moment();

    const overdueLoans = await Loan.find({
      user: userId,
      status: "overdue"
    }).populate("customer");
    

    const customers = overdueLoans.map(l => ({
      customer: l.customer.name,
      phone: l.customer.phone,
      loanAmount: l.amount,
      paidAmount: l.paidAmount,
      dueDate: moment(l.dueDate).format("YYYY-MM-DD")
    }));

    overdueLoans.forEach(l => {
      console.log(`Sending SMS to ${l.customer.phone}: 
        Hello ${l.customer.name}, you have an overdue payment of ₹${l.amount - l.paidAmount}. Please pay before ${moment(l.dueDate).format("DD MMM YYYY")}`);
    });

    res.json({ count: customers.length, customers });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch overdue customers" });
  }
};
