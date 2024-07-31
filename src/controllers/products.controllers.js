const productModel = require("../models/product.model");
require("../db/dbconnection");

const controller = {};

const queryAll = async () => {
  try {
    return await productModel.find();
  } catch (error) {
    console.log(error);
    return [];
  }
};

const queryByID = async (id) => {
  try {
    return await productModel.findById(id);
  } catch (error) {
    console.log(error);
    return null;
  }
};

controller.getAllProducts = async (req, res) => {
  const productsBD = await queryAll();
  res.render("prodsList", {
    titulo: "Listado de Productos",
    productos: productsBD,
  });
};

controller.getProductBySeccion = async (req, res) => {
  const seccion = req.query.seccion;
  const productBD = await productModel.find({ seccion: seccion });

  res.render("prodsList", {
    titulo: "Sección",
    productos: productBD,
    seccion: seccion,
  });
};

controller.getProductDetail = async (req, res) => {
  const producto = await queryByID(req.params.id);
  if (!producto) {
    return res.status(404).send("Producto no encontrado");
  }
  res.render("prodDetail", {
    producto: producto,
  });
  console.log(producto);
};

module.exports = controller;
