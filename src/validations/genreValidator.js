let { check } = require("express-validator");

module.exports = [
  check("nombre").notEmpty().withMessage("Debes colocar el nombre del genero"),
];
