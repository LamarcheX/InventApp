const mongoose = require("mongoose");

const productosSchema = new mongoose.Schema({
  foto: { type: String },
  nombre: {
    type: String,
    trim: true,
    require: [true, "Nombre de producto es requerido"],
  },
  desccorta: { type: String, trim: true },
  descextendida: { type: String, trim: true, minLength: [] },
  disponibles: {
    type: Number,
    default: 0.0,
    require: [true, "Cantidad disponible es requerida"],
  },
  precio: {
    type: Number,
    default: 0.0,
    require: [true, "Precio de producto es requerido"],
  },
  caracteristicas: { type: [String], default: [] },
  seccion: {
    type: String,
    trim: true,
    require: [true, "Sección de producto es requerida"],
  },
});

const producto = mongoose.model("products", productosSchema);

module.exports = producto;
