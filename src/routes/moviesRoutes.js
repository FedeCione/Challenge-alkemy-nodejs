let express = require("express");
let router = express.Router();
let movieAvatar = require("../middlewares/movieAvatar");
let { movieList, formMovieAdd, movieAdd, formMovieEdit, movieEdit, movieDelete, movieDetail, search } = require("../controllers/moviesController");
let movieValidator = require('../validations/movieValidator');
let verifyToken = require('../middlewares/verifyToken');

// Movie List
router.get("/", verifyToken, movieList);

// Movie Detail
router.get("/detail/:id", verifyToken, movieDetail);

// Movie Add
router.get("/add", verifyToken, formMovieAdd);
router.post("/add", verifyToken, movieAvatar.single("imagen_pelicula_serie"), movieValidator, movieAdd);

// Movie Edit
router.get("/edit/:id", verifyToken, formMovieEdit);
router.put("/edit/:id", verifyToken, movieAvatar.single('imagen_pelicula_serie'), movieValidator, movieEdit);

// Movie Delete
router.delete("/delete/:id", verifyToken, movieDelete);

// Movie Search
router.get("/search", verifyToken, search);

module.exports = router;