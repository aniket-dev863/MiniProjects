// connect to our database  .
const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to Database Successfully `);
  } catch (err) {
    console.log(`Not able to connect to database `);
    process.exit(1);
  }
};

module.exports = connectdb;
