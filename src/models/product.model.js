const mongoose = require("mongoose");

const productosSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  desccorta: { type: String, required: true, trim: true },
  descextendida: { type: String, required: true, trim: true },
  disponibles: { type: Number, default: 0.0 },
  precio: { type: Number, default: 0.0 },
  caracteristicas: { type: [String], default: [] },
  seccion: { type: String, required: true, trim: true },
});

const producto = mongoose.model("products", productosSchema);

module.exports = producto;
