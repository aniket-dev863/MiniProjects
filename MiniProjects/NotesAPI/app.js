const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incomming request:`, req.method, req.url);
  next();
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/writing", require("./routes/noteRoutes"));
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "API is Running Smooth",
  });
});
module.exports = app;
