//Modelo de db de peliculas
const S = require("sequelize");
const db = require("../db/index");

class Movie extends S.Model {}

Movie.init(
  {
    peliculaId: {
      type: S.INTEGER,
      allowNull: false,
      unique: true,
    },
    title: {
      type: S.STRING,
    },
    poster_path: {
      type: S.STRING,
    },
    overview: {
      type: S.TEXT,
    },
    vote_average: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "movie" }
);

module.exports = Movie;
