const express = require("express");
const router = express.Router();
const axios = require("axios");
const { User, Movie, Tv } = require("../models");

const { generateToken, validateToken } = require("../config/token");

//mostrar todos los usuarios con las tablas incluidas
router.get("/get", (req, res, next) => {
  User.findAll({
    include: [
      { model: Movie, required: true },
      { model: Tv, require: true },
    ],
  })
    .then((result) => res.send(result))
    .catch(next);
});
//traer datos del usuario por el nombre de usuario
router.get("/:usuario", (req, res) => {
  User.findAll({
    where: {
      usuario: req.params.usuario,
    },
    include: [
      { model: Movie, required: true },
      { model: Tv, require: true },
    ],
  })
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
});
// guardar los datos del registro en la db
router.post("/register", (req, res, next) => {
  User.create(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch(next);
});
// hacer el ingreso a la pagina
router.post("/login", (req, res, next) => {
  const { usuario, contraseña } = req.body;
  User.findOne({ where: { usuario } })
    .then((user) => {
      if (!user) return res.sendStatus(401);
      user.validatePassword(contraseña).then((isValid) => {
        if (!isValid) return res.sendStatus(401);
        const payload = {
          nombre: user.nombre,
          email: user.email,
          apellido: user.apellido,
          usuario: user.usuario,
        };
        const token = generateToken(payload);
        res.cookie("token", token);
        res.send(payload);
      });
    })
    .catch(next);
});
// pagina del perfil
router.get("/inicio", (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  res.send(user).catch(next);
});
//ruta para generar la persistencia del usuario en la pagina
router.get("/me", (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  res.send(user).catch(next);
});
// cerrar sesion
router.post("/logout", (req, res, next) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

module.exports = router;
