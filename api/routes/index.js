const express = require("express");
const router = express.Router();
const routesPeliculas = require("./peliculas");
const routesTv = require("./tv");
const routesUser = require("./user")

router.use("/movie", routesPeliculas);
router.use("/tv", routesTv);
router.use("/user", routesUser);

module.exports = router;
