const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
/**
 * loads everthing present in the dotenv file .
 */
connectDB();
/**
 * Connecting to the database is essential before the starting the server .
 */
const app = express();

// Middleware
app.use(express.json());
/**
 * converts our incomming data in json .
 */
// Logger middleware
app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.url);
  next();
});

// Test route
app.post("/test", (req, res) => {
  console.log("Body:", req.body);
  res.json({ message: "Test route working", body: req.body });
});

// Auth routes
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("API Working fine");
});

module.exports = app;
