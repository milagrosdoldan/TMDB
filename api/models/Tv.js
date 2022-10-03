//modelo de db de Programas de Tv
const S = require("sequelize");
const db = require("../db/index");

class Tv extends S.Model {}

Tv.init(
  {
    tvId: {
      type: S.INTEGER,
      allowNull: false,
      unique: true,
    },
    name: {
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
  { sequelize: db, modelName: "tv" }
);

module.exports = Tv;
