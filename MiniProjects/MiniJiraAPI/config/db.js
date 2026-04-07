const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to Database at ${new Date().toLocaleString()}.`);
  } catch (err) {
    console.log(`DB Connection Failed :${err.message}.`);
    process.exit(1);
  }
};

module.exports = connectDB;
