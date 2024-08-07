const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  foto: { type: String },
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

userSchema.statics.findByIdAndDelete = function (id) {
  return this.findById(id).then((user) => (user ? user.remove() : null));
};

const user = mongoose.model("user", userSchema);
module.exports = user;
