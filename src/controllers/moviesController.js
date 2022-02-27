const db = require("../database/models");
const fs = require("fs");
const { Op } = require("sequelize");

module.exports = {
  movieList: (req, res) => {
    db.Movies.findAll()
      .then((data) => {
        db.Genres.findAll().then((genres) => {
          res.render("movies/movieList", { data, genres });
        });
      })
      .catch((error) => res.send(error));
  },
  movieDetail: (req, res) => {
    db.Movies.findByPk(req.params.id, {
      include: ["movie_genre", "characters"],
    })
      .then((movie) => {
        let arrayCharacters = [];
        movie.characters.forEach((character) => {
          arrayCharacters.push(character.nombre);
        });
        res.render("movies/movieDetail", { movie, arrayCharacters });
      })
      .catch((error) => console.log(error));
  },
  formMovieAdd: (req, res) => {
    db.Genres.findAll()
      .then((genres) => {
        db.Characters.findAll()
          .then((characters) => {
            res.render("movies/movieAdd", { genres, characters });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  },
  movieAdd: (req, res) => {
    let {
      titulo,
      fecha_creacion,
      calificacion,
      id_genero,
      id_characters_asociated,
    } = req.body;
    let arrayCharacters = [];
    if (id_characters_asociated instanceof Array) {
      id_characters_asociated.forEach((item) => {
        arrayCharacters.push(item);
      });
    } else {
      arrayCharacters.push(id_characters_asociated);
    }

    db.Movies.create({
      titulo,
      fecha_creacion,
      calificacion,
      id_genero,
      imagen_pelicula_serie: req.file.filename,
    })
      .then((result) => {
        arrayCharacters.forEach((character) => {
          db.CharacterMoviePivots.create({
            id_personaje: character,
            id_pelicula_serie: result.id,
          });
        });
        res.redirect("/movies");
      })
      .catch((error) => console.log(error));
  },
  formMovieEdit: (req, res) => {
    db.Movies.findByPk(req.params.id)
      .then((movie) => {
        db.Genres.findAll()
          .then((genres) => {
            db.Characters.findAll()
              .then((characters) => {
                db.CharacterMoviePivots.findAll({
                  where: {
                    id_pelicula_serie: req.params.id,
                  },
                })
                  .then((asociatedCharacters) => {
                    res.render("movies/movieEdit", {
                      movie,
                      genres,
                      characters,
                      asociatedCharacters,
                    });
                  })
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  },
  movieEdit: (req, res) => {
    let {
      titulo,
      fecha_creacion,
      calificacion,
      id_genero,
      id_characters_asociated,
    } = req.body;
    let arrayCharacters = [];
    if (id_characters_asociated instanceof Array) {
      id_characters_asociated.forEach((item) => {
        arrayCharacters.push(item);
      });
    } else {
      arrayCharacters.push(id_characters_asociated);
    }

    db.Movies.findByPk(req.params.id)
      .then((movie) => {
        let oldImage = movie.imagen_pelicula_serie;
        db.Movies.update(
          {
            titulo,
            fecha_creacion,
            calificacion,
            id_genero,
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
                id_pelicula_serie: req.params.id,
              },
            })
              .then(() => {
                arrayCharacters.forEach((character) => {
                  db.CharacterMoviePivots.create({
                    id_personaje: character,
                    id_pelicula_serie: req.params.id,
                  });
                });
                if (req.file && req.file.filename) {
                  fs.existsSync("./public/images/movies/", oldImage)
                    ? fs.unlinkSync("./public/images/movies/" + oldImage)
                    : console.log(
                        "No se encontró la imagen que se queria eliminar"
                      );
                }
                res.redirect("/movies");
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  },
  movieDelete: (req, res) => {
    db.Movies.findByPk(req.params.id)
      .then((movie) => {
        let imageDelete = movie.imagen_pelicula_serie;
        db.CharacterMoviePivots.destroy({
          where: {
            id_pelicula_serie: req.params.id,
          },
        })
          .then(() => {
            db.Movies.destroy({
              where: {
                id: req.params.id,
              },
            }).then(() => {
              fs.existsSync("./public/images/movies/", imageDelete)
                ? fs.unlinkSync("./public/images/movies/" + imageDelete)
                : console.log(
                    "No se encontró la imagen que se queria eliminar"
                  );
              res.redirect("/movies");
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  },
  search: (req, res) => {
    db.Movies.findAll({
      where: {
        titulo: {
          [Op.substring]: req.query.title,
        },
        id_genero: {
          [Op.substring]: req.query.genre,
        },
      },
      order: [["fecha_creacion", req.query.order]],
    })
      .then((data) => {
        db.Genres.findAll().then((genres) => {
          let result = {
            status: 200,
            length: data.length,
          };
          res.render("movies/movieList", { result, data, genres });
        });
      })
      .catch((error) => console.log(error));
  },
};
