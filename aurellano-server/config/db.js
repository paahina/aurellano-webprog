const mongoose = require("mongoose");

const connectDB = async () => {
  //Connect MongoDB at default port 27017
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MOngoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
