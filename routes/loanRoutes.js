const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createLoan,
  getLoans
} = require("../controllers/loanController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createLoan);           // Create loan
router.get("/", getLoans);              // Get all loans (optional ?status=paid/pending/overdue)

module.exports = router;
