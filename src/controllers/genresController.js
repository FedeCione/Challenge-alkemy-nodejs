const db = require("../database/models");
const fs = require("fs");
const { Op } = require("sequelize");

module.exports = {
  genreList: (req, res) => {
    db.Genres.findAll()
      .then((data) => {
        res.render("genres/genreList", { data });
      })
      .catch((error) => res.send(error));
  },
  genreDetail: (req, res) => {
    db.Genres.findByPk(req.params.id)
    .then((genre) => {
      res.send(genre)
      db.Movies.findAll({
        where: {
          id_genero: genre.id
        }
      })
      .then((moviesAsociated) => {
        res.render("genres/genreDetail", { genre, moviesAsociated});
      })
    })
    .catch(error => console.log(error));
  },
  formGenreAdd: (req, res) => {
    res.render("genres/genreAdd");
  },
  genreAdd: (req, res) => {
    let { nombre } = req.body;

    db.Genres.create({
      nombre,
      imagen_genero: req.file.filename
    })
      .then((result) => {
        res.redirect("/genres");
      })
      .catch((error) => console.log(error));
  },
  formGenreEdit: (req, res) => {
    db.Genres.findByPk(req.params.id).then((genre) => {
      res.render("genres/genreEdit", { genre });
    });
  },
  genreEdit: (req, res) => {
    let { nombre } = req.body;
    db.Genres.findByPk(req.params.id)
      .then((genre) => {
        let oldImage = genre.imagen_genero;
        db.Genres.update(
          {
            nombre,
            imagen_personaje: req.file && req.file.filename
          },
          {
            where: {
              id: req.params.id,
            },
          }
        ).then(() => {
          if (req.file && req.file.filename) {
            fs.existsSync("./public/images/genres/", oldImage)
              ? fs.unlinkSync("./public/images/genres/" + oldImage)
              : console.log("No se encontró la imagen que se queria eliminar");
          }
          res.redirect("/genres");
        });
      })
      .catch((error) => console.log(error));
  },
  genreDelete: (req, res) => {
    db.Genres.findByPk(req.params.id)
      .then((genre) => {
        let imageDelete = genre.imagen_genero;
        db.Genres.destroy({
          where: {
            id: req.params.id,
          },
        })
          .then(() => {
            fs.existsSync("./public/images/genres/", imageDelete)
              ? fs.unlinkSync("./public/images/genres/" + imageDelete)
              : console.log("No se encontró la imagen que se queria eliminar");
          })
          .then(res.redirect("/genres"));
      })
      .catch((error) => console.log(error));
  }
};