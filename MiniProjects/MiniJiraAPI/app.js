const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use("/api/board", require("./routes/boardRoutes"));
app.use((req, res, next) => {
  console.log(
    `Current time :${new Date.now().toLocaleString()} --- Request Method :${req.method} ---- Request URL :${req.url} .`,
  );
  next();
});
app.use("api/boards", require("./controllers/boardControllers"));

module.export = app;
