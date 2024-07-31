const express = require("express");
const router = new express.Router();
const usermgmtController = require("../controllers/usermgmt.controllers");

router.get("/users", usermgmtController.getUsers);
// router.post("/users", usermgmtController.postUser);
// router.delete("/users/delete/:id", usermgmtController.deleteUser);

module.exports = router;
