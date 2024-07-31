const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Midleware para verificar si el usuario esta autenticado
const authMiddleware = (req, res) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/login");
};

// Ruta para mostrar el formulario de inicio de sesión
router.get("/login", (req, res) => {
  res.render("login");
});

// Ruta para manejar el inicio de sesión
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

    // Establecer sesion del usuario
    req.session.user = user;

    res.redirect("/admin/user");
  } catch (err) {
    res.status(500).send("Error del servidor");
  }
});

module.exports = { router, authMiddleware };
