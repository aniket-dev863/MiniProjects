const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb Connected Successfully`);
  } catch (error) {
    console.log("DB Connection Failed :", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
/**
 * Config folder exports the routes to connect to the DB .
 *
 * mongoose.connect() returns a promise  .
 * mongoose.connect(process.env.MONGO_URI).then(()=>{console.log(`Connected to DB `)}).catch((err)=>{console.log(err)});
 */
