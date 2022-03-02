let { check } = require("express-validator");

module.exports = [
  check("titulo").notEmpty().withMessage("Debes colocar el titulo de la pelicula"),

  check("fecha_creacion").notEmpty().withMessage("Debes colocar la fecha de creacion de la pelicula"),

  check("calificacion").notEmpty().withMessage("Debes colocar la calificacion de la pelicula").isLength({min: 1, max: 5}).withMessage("La calificacion debe ser de 1 a 5"),

  check("id_genero").notEmpty().withMessage("Debes elegir el genero de la pelicula"),
];