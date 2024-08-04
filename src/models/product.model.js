const mongoose = require("mongoose");

const productosSchema = new mongoose.Schema({
  foto: { type: String },
  nombre: { type: String, trim: true },
  desccorta: { type: String, trim: true },
  descextendida: { type: String, trim: true },
  disponibles: { type: Number, default: 0.0 },
  precio: { type: Number, default: 0.0 },
  caracteristicas: { type: [String], default: [] },
  seccion: { type: String, trim: true },
});

const producto = mongoose.model("products", productosSchema);

module.exports = producto;
