const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL_LOCAL);
    console.log(
      `connected to the database `.bgCyan.white,
      connect.connection.name
    );
  } catch (error) {
    console.log(`error in connection db ${error}`.bgRed.white);
    process.exit(1);
  }
  
};

module.exports = connectDB;
