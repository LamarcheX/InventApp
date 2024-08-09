const mongoose = require("mongoose");
require("dotenv").config();

const collection = process.env.DB_COLLECTION;
const dbURI = process.env.DB_URI;
const dbPort = process.env.DB_PORT;
const url = `${dbURI}:${dbPort}/${collection}`;



try {
  mongoose.connect(url);
  console.log("MongoDb corriendo");
} catch (error) {
  console.error();
}

/*const connection = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB
*/
