let { check } = require("express-validator");
const db = require("../database/models");

module.exports = [
  check("email").isEmail().withMessage("Debes ingresar un email valido"),

  check("email").custom((value) => {
    return db.Users.findOne({
      where: {
        email: value,
      },
    }).then((user) => {
      if (user) {
        return Promise.reject("Este email ya está registrado");
      }
    });
  }),

  check("password")
    .notEmpty()
    .withMessage("Escribe tu contraseña")
    .isLength({ min: 4, max: 12 })
    .withMessage("La contraseña debe tener entre 4 y 12 caracteres"),
];
