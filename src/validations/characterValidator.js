let { check } = require("express-validator");

module.exports = [
  check("nombre").notEmpty().withMessage("Debes colocar el nombre del personaje"),

  check("edad").notEmpty().withMessage("Debes colocar la edad del personaje"),

  check("peso").notEmpty().withMessage("Debes colocar el peso del personaje"),

  check("historia").notEmpty().withMessage("Debes colocar la historia del personaje"),
];
