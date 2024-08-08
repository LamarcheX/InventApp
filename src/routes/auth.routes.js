const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const authMiddleware = (req, res) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/login");
};

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Contraseña incorrecta");
    }

    req.session.user = user;

    res.redirect("/admin/user");
  } catch (err) {
    res.status(500).send("Error del servidor");
  }
});

module.exports = { router, authMiddleware };
