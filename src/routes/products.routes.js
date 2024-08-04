const express = require("express");
const router = new express.Router();
const productsController = require("../controllers/products.controllers");

router.get("/products", productsController.getAllProducts);
router.get("/products/seccion", productsController.getProductBySeccion);
router.get("/products/detalle/:id", productsController.getProductDetail);
router.post("/products/actualizar/:id", productsController.updateProduct);
router.post("/products/salvar", productsController.addProduct);
router.get("/products/agregarProducto", productsController.addProductForm);
router.get("/products/editarProducto/:id", productsController.editProductForm);
router.delete("/products/borrar/:id", productsController.deleteUser);

module.exports = router;
