const db = require("../database/models");
const fs = require("fs");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
  characterList: (req, res) => {
    db.Characters.findAll()
      .then((data) => {
        db.Movies.findAll()
          .then((movies) => {
            res.render("characters/characterList", { data, movies });
          })
          .catch((error) => res.send(error));
      })
      .catch((error) => res.send(error));
  },
  characterDetail: (req, res) => {
    db.Characters.findByPk(req.params.id, {
      include: ["movies"],
    })
      .then((character) => {
        let arrayMovies = [];
        character.movies.forEach((movie) => {
          arrayMovies.push(movie.titulo);
        });
        res.render("characters/characterDetail", { character, arrayMovies });
      })
      .catch((error) => console.log(error));
  },
  formCharacterAdd: (req, res) => {
    db.Movies.findAll()
      .then((movies) => {
        res.render("characters/characterAdd", { movies });
      })
      .catch((error) => console.log(error));
  },
  characterAdd: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty() && req.file) {
      let { nombre, edad, peso, historia, id_movies_asociated } = req.body;
      let arrayMovies = [];
      if (id_movies_asociated instanceof Array) {
        id_movies_asociated.forEach((item) => {
          arrayMovies.push(item);
        });
      } else {
        arrayMovies.push(id_movies_asociated);
      }

      db.Characters.create({
        nombre,
        edad,
        peso,
        historia,
        imagen_personaje: req.file && req.file.filename,
      })
        .then((result) => {
          arrayMovies.forEach((movie) => {
            db.CharacterMoviePivots.create({
              id_personaje: result.id,
              id_pelicula_serie: movie,
            });
          });
          res.redirect("/characters");
        })
        .catch((error) => console.log(error));
    } else {
      db.Movies.findAll()
        .then((movies) => {
          let fileEmpty = "Debes colocar una imagen";
          res.render("characters/characterAdd", {
            movies,
            errors: errors.mapped(),
            fileEmpty,
            fileError: req.fileValidationError,
            old: req.body,
          });
        })
        .catch((error) => console.log(error));
    }
  },
  formCharacterEdit: (req, res) => {
    db.Characters.findByPk(req.params.id)
      .then((character) => {
        db.Movies.findAll()
          .then((movies) => {
            db.CharacterMoviePivots.findAll({
              where: {
                id_personaje: req.params.id,
              },
            })
              .then((asociatedMovies) => {
                res.render("characters/characterEdit", {
                  character,
                  movies,
                  asociatedMovies,
                });
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  },
  characterEdit: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty() && !req.fileValidationError) {
      let { nombre, edad, peso, historia, id_movies_asociated } = req.body;
      let arrayMovies = [];
      if (id_movies_asociated instanceof Array) {
        arrayMovies.push(...id_movies_asociated);
      } else {
        arrayMovies.push(id_movies_asociated);
      }
      db.Characters.findByPk(req.params.id)
        .then((character) => {
          let oldImage = character.imagen_personaje;
          db.Characters.update(
            {
              nombre,
              edad,
              peso,
              historia,
              imagen_personaje: req.file && req.file.filename,
            },
            {
              where: {
                id: req.params.id,
              },
            }
          )
            .then(() => {
              db.CharacterMoviePivots.destroy({
                where: {
                  id_personaje: req.params.id,
                },
              })
                .then(() => {
                  arrayMovies.forEach((movie) => {
                    db.CharacterMoviePivots.create({
                      id_personaje: req.params.id,
                      id_pelicula_serie: movie,
                    });
                  });
                  if (req.file && req.file.filename) {
                    fs.existsSync("./public/images/characters/", oldImage)
                      ? fs.unlinkSync("./public/images/characters/" + oldImage)
                      : console.log(
                          "No se encontró la imagen que se queria eliminar"
                        );
                  }
                  res.redirect("/characters");
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    } else {
      db.Characters.findByPk(req.params.id)
        .then((character) => {
          db.Movies.findAll()
            .then((movies) => {
              db.CharacterMoviePivots.findAll({
                where: {
                  id_personaje: req.params.id,
                },
              })
                .then((asociatedMovies) => {
                  res.render("characters/characterEdit", {
                    movies,
                    errors: errors.mapped(),
                    fileError: req.fileValidationError,
                    old: req.body,
                    character,
                    asociatedMovies,
                  });
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  },
  characterDelete: (req, res) => {
    db.Characters.findByPk(req.params.id)
      .then((character) => {
        let imageDelete = character.imagen_personaje;
        db.CharacterMoviePivots.destroy({
          where: {
            id_personaje: req.params.id,
          },
        })
          .then(() => {
            db.Characters.destroy({
              where: {
                id: req.params.id,
              },
            })
              .then(() => {
                fs.existsSync("./public/images/characters/", imageDelete)
                  ? fs.unlinkSync("./public/images/characters/" + imageDelete)
                  : console.log(
                      "No se encontró la imagen que se queria eliminar"
                    );
                res.redirect("/characters");
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  },
  search: (req, res) => {
    db.Characters.findAll({
      where: {
        nombre: {
          [Op.substring]: req.query.name,
        },
        edad: {
          [Op.substring]: req.query.age,
        },
        peso: {
          [Op.substring]: req.query.weight,
        },
      },
      include: ["movies"],
    })
      .then((charactersUnfiltered) => {
        let data = [];
        if (req.query.movies) {
          for (let i = 0; i < charactersUnfiltered.length; i++) {
            for (let j = 0; j < charactersUnfiltered[i].movies.length; j++) {
              if (charactersUnfiltered[i].movies[j].id == req.query.movies) {
                data.push(charactersUnfiltered[i]);
              }
            }
          }
        } else {
          data = charactersUnfiltered;
        }

        db.Movies.findAll().then((movies) => {
          let result = {
            status: 200,
            length: data.length,
          };
          res.render("characters/characterList", { result, data, movies });
        });
      })
      .catch((error) => console.log(error));
  },
};
