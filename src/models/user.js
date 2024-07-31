const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define user schema
const UserSchema = new Schema({
  nombres: { type: String, require: true },
  apellido1: { type: String, require: true },
  apellido2: { type: String, require: true },
  celular: { type: String },
  cedula: { type: String, require: true },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Export the user schema
module.exports = mongoose.model("User", UserSchema);
