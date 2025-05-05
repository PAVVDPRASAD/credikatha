const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const loanRoutes = require("./routes/loanRoutes");
const repaymentRoutes = require("./routes/repaymentRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
const app = express();
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/repayments", repaymentRoutes);
app.use("/api/report", summaryRoutes);

app.get('/', (req,res) => {
    res.send("Credikhaata API running...");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));