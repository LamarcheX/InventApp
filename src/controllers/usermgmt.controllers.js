// const bcrypt = require("bcryptjs");

const userModel = require("../models/user");
require("../db/dbconnection");

const controller = {};

const queryAll = async () => {
  try {
    return await userModel.find();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Ruta para mostrar la lista de usuarios en formato json
controller.getUsers = async (req, res) => {
  try {
    const usersRequest = await queryAll(); // Obtener todos los usuarios
    res.render("adminUser", {
      titulo: "Administración de Usuarios",
      users: usersRequest,
    }); // Renderizar la vista con la lista de usuarios
    // console.log(usersRequest);
    // console.log(typeof usersRequest);
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
};

// // Ruta para manejar la adicion de usuarios
// controller.postUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 8); // Hasheamos la contraseña
//     const newUser = new userModel({ email, password: hashedPassword }); // Creamos un nuevo usuario
//     await newUser.save(); // Guardamos el usuario en la base de datos
//     res.json(newUser); // Devolvemos el usuario creado en formato JSON
//   } catch (err) {
//     res.status(500).send("Error del servidor");
//   }
// };

// // Ruta para manejar la eliminacion de usuarios
// controller.deleteUser = async (req, res) => {
//   try {
//     // Intenta encontrar y eliminar el usuario por ID
//     await userModel.findByIdAndDelete(req.params.id);
//     // Si tiene éxito, devuelve un estado 204 (sin contenido)
//     res.status(204).send();
//   } catch (err) {
//     // Si hay un error, devuelve un estado 500 (error del servidor)
//     res.status(500).send("Error del servidor");
//   }
// };

module.exports = controller;
