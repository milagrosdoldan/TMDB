//Modelo de db de Usuarios.
const S = require("sequelize");
const db = require("../db/index");
const bcrypt = require("bcrypt");

class User extends S.Model {
  hash(contraseña, salt) {
    return bcrypt.hash(contraseña, salt);
  }

  validatePassword(contraseña) {
    return this.hash(contraseña, this.salt).then(
      (hash) => hash === this.contraseña
    );
  }
}

User.init(
  {
    nombre: {
      type: S.STRING,
      allowNull: false,
    },
    apellido: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      validate: {
        isEmail: true,
      },
    },
    usuario: {
      type: S.STRING,
      allowNull: false,
    },
    contraseña: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);

User.beforeCreate((user) => {
  user.salt = bcrypt.genSaltSync();
  return user
    .hash(user.contraseña, user.salt)
    .then((hash) => (user.contraseña = hash));
});

module.exports = User;
