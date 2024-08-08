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
};

controller.addProductForm = async (req, res) => {
  res.render("prodAdd");
};

controller.editProductForm = async (req, res) => {
  const producto = await queryByID(req.params.id);
  if (!producto) {
    return res.status(404).send("Producto no encontrado");
  }
  res.render("prodEdit", {
    producto: producto,
  });
};

controller.addProduct = async (req, res) => {
  console.log(`--------------------------------`);
  console.log(`body del formulario: ${req.body.id}`);
  console.log(`--------------------------------`);

  const page = parseInt(req.query.page) || 1;

  if (req.params.id) {
    console.log(`producto con ID`);
  }

  const {
    foto,
    nombre,
    desccorta,
    descextendida,
    disponibles,
    precio,
    caracteristicas1,
    caracteristicas2,
    caracteristicas3,
    seccion,
  } = req.body;

  const caracteristicas = [
    caracteristicas1,
    caracteristicas2,
    caracteristicas3,
  ];

  const newProducto = new productModel({
    foto,
    nombre,
    desccorta,
    descextendida,
    disponibles,
    precio,
    caracteristicas,
    seccion,
  });
  try {
    await newProducto.save();
    res.status(201);
    res.redirect("/products/agregarProducto");
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

controller.updateProduct = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Se requiere el ID del Producto");
  }

  const id = req.params.id;
  const filter = { _id: id };

  const {
    foto,
    nombre,
    desccorta,
    descextendida,
    disponibles,
    precio,
    caracteristicas1,
    caracteristicas2,
    caracteristicas3,
    seccion,
  } = req.body;

  const caracteristicas = [
    caracteristicas1,
    caracteristicas2,
    caracteristicas3,
  ];

  const newProducto = {
    foto,
    nombre,
    desccorta,
    descextendida,
    disponibles,
    precio,
    caracteristicas,
    seccion,
  };

  try {
    const updatedProduct = await productModel
      .findOneAndReplace(filter, newProducto, { new: true })
      .lean();
    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }
    res.redirect(`/products/detalle/${id}`);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

controller.deleteUser = async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await productModel.deleteOne({ _id });

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }
    res.send("Producto eliminado");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = controller;
