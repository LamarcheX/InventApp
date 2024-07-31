const mongoose = require("mongoose");
// require("dotenv").config();

const database = "TestDB";
const url = `mongodb://localhost:27017/${database}`;

try {
  mongoose.connect(url);
  console.log("MongoDb corriendo");
} catch (error) {
  console.error();
}

// mongoose.connect(process.env.MONGODB_URI);

/*const connection = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;

// import mongoose to interact with MongoDB
const mongoose = require('mongoose')
require('dotenv').config()

// Async func to conect to DB
const connectDB = async () => {
    try {
    // Try to connect to mongoDB using the URL from env var
    await mongoose.connect(process.env.MONGODB_URI)
      console.log('MongoDB connected')
    
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB
*/
