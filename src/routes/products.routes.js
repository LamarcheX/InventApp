const express = require("express");
const router = new express.Router();
const productsController = require("../controllers/products.controllers");

router.get("/products", productsController.getAllProducts);
router.get("/seccion", productsController.getProductBySeccion);
router.get("/detalle/:id", productsController.getProductDetail);

module.exports = router;
