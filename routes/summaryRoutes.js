const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getSummary } = require("../controllers/summaryController");
const { getOverdueCustomers } = require("../controllers/overdueController");

const router = express.Router();

router.use(authMiddleware);

router.get("/summary", getSummary);         
router.get("/overdue", getOverdueCustomers); 

module.exports = router;
