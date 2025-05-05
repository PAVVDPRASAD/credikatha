const express = require("express");
const { recordRepayment } = require("../controllers/repaymentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", recordRepayment); // Record a repayment

module.exports = router;
