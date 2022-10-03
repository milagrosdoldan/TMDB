// Configuración del server
const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./db");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const { User, Movie, Tv } = require("./models");

// logging middleware
app.use(morgan("tiny"));
// parsing middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  console.log("DB conectada");
  app.listen(3001, () => console.log("Servidor escuchando en el puerto 3001"));
});
