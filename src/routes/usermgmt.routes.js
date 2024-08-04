const express = require("express");
const router = new express.Router();
const usermgmtController = require("../controllers/usermgmt.controllers");

router.get("/users", usermgmtController.getUsers);
router.get("/users/:id", usermgmtController.getUserByID);
router.post("/users/salvar", usermgmtController.postUser);
router.post("/users/actualizar/:id", usermgmtController.updateUser);
router.get("/users/editarUsuario/:id", usermgmtController.editUserForm);
router.delete("/users/borrar/:id", usermgmtController.deleteUser);

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
