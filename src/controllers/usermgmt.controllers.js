// const bcrypt = require("bcryptjs");

const userModel = require("../models/user");
require("../db/dbconnection");

const controller = {};

controller.userDetails = async (req, res) => {
  const userID = req.params.id;
  try {
    const userRequested = await userModel.findOne({ userID });
    if (!userRequested) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    } else {
      res.render("userDetail", {
        titulo: "Administración de Usuarios",
        user: userRequested,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send(`${error} ---> usuario con el ID: ${userID} no encontrado`);
  }
};

controller.getUsers = async (req, res) => {
  try {
    const usersRequest = await userModel.find({});
    res.render("adminUser", {
      titulo: "Administración de Usuarios",
      users: usersRequest,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

controller.getUserByID = async (req, res) => {
  const userID = req.params.id;
  try {
    const userRequested = await userModel.findById(userID).exec();
    if (!userRequested) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    } else {
      res.render("userDetail", {
        titulo: "Administración de Usuarios",
        user: userRequested,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send(`${error} ---> usuario con el ID: ${userID} no encontrado`);
  }
};

controller.deleteUser = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await userModel.deleteOne({ _id });

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.send("Usuario eliminado");
  } catch (error) {
    res.status(500).send(error);
  }
};

controller.postUser = async (req, res) => {
  const {
    nombres,
    apellido1,
    apellido2,
    celular,
    cedula,
    email,
    foto,
    password,
  } = req.body;

  const newUser = new userModel({
    nombres,
    apellido1,
    apellido2,
    celular,
    cedula,
    email,
    foto,
    password,
  });

  try {
    await newUser.save();
    res.status(201);
  } catch (error) {
    res.status(500).send(error);
  }
  res.redirect("/users");
};

controller.editUserForm = async (req, res) => {
  const userDB = await userModel.findById(req.params.id);
  if (!userDB) {
    return res.status(404).send("Usuario no encontrado");
  }
  res.render("userEdit", {
    user: userDB,
  });
};

controller.updateUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Se requiere el ID del Usuario");
  }

  const id = req.params.id;
  const filter = { _id: id };

  const {
    nombres,
    apellido1,
    apellido2,
    celular,
    cedula,
    email,
    password,
    foto,
  } = req.body;

  const newUser = {
    nombres,
    apellido1,
    apellido2,
    celular,
    cedula,
    email,
    password,
    foto,
  };

  try {
    const updatedUser = await userModel
      .findOneAndReplace(filter, newUser, { new: true })
      .lean();
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.redirect(`/users`);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports = controller;
